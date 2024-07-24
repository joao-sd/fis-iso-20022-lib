import fs from 'fs';
import path from 'path';
import { injectable } from 'tsyringe';
import validateSchema from 'xsd-validator';
import { DATA_PATH } from '../constants/pathConstants';
import { PACSExtractor } from '../extractor/PACSExtractor';

@injectable()
export class PACSValidator {
  private readonly appHdrXSDPath = path.join(DATA_PATH, 'head.001.001.03.xsd');

  private readonly xsdFilePaths = {
    pacs008: path.join(DATA_PATH, 'pacs.008.001.08.xsd'),
    pacs009: path.join(DATA_PATH, 'pacs.009.001.08.xsd'),
    pacs004: path.join(DATA_PATH, 'pacs.004.001.10.xsd'),
  };

  constructor(private pacsExtractor: PACSExtractor) {}

  public validateXMLContent(
    xmlContent: string,
    xsdPathKey: keyof typeof this.xsdFilePaths,
  ): boolean {
    const xsdFilePath = this.xsdFilePaths[xsdPathKey];
    return this.validate(xmlContent, xsdFilePath);
  }

  public validateXmlByPath(xmlFilePath: string, xsdFilePath: string): boolean {
    try {
      const rawXmlFile = fs.readFileSync(xmlFilePath, 'utf-8');
      return this.validate(rawXmlFile, xsdFilePath);
    } catch (error) {
      console.error('Validation failed:', error);
      return false;
    }
  }

  private validate(xmlContent: string, xsdFilePath: string): boolean {
    try {
      const { document, appHdr } =
        this.pacsExtractor.extractAppHdrAndDocument(xmlContent);

      if (!document) {
        throw new Error('Document not found in the XML content');
      }

      if (!appHdr) {
        throw new Error('AppHdr not found in the XML content');
      }

      // Validate appHdr against appHdr.xsd
      if (!this.validateAgainstXSD(appHdr, this.appHdrXSDPath)) {
        return false;
      }

      // Validate document against the provided xsdFilePath
      if (!this.validateAgainstXSD(document, xsdFilePath)) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Validation failed:', error);
      return false;
    }
  }

  private validateAgainstXSD(xmlContent: string, xsdFilePath: string): boolean {
    try {
      const xsdString = fs.readFileSync(xsdFilePath, 'utf-8');
      const validationResult = validateSchema(xmlContent, xsdString);

      if (Array.isArray(validationResult)) {
        console.error(
          'Validation errors for XSD:',
          xsdFilePath,
          validationResult,
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('XSD validation failed:', error);
      return false;
    }
  }
}
