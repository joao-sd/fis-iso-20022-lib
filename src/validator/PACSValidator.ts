import fs from 'fs';
import path from 'path';
import { injectable } from 'tsyringe';
import validateSchema from 'xsd-validator';
import { DATA_PATH } from '../constants/pathConstants';
import { PACSExtractor } from '../extractor/PACSExtractor';

@injectable()
export class PACSValidator {
  private readonly appHdrXSDPath = path.join(DATA_PATH, 'head.001.001.03.xsd');

  constructor(private pacsExtractor: PACSExtractor) {}

  public validateXml(xmlFilePath: string, xsdFilePath: string): boolean {
    try {
      const rawXmlFile = fs.readFileSync(xmlFilePath, 'utf-8');

      const { document, appHdr } =
        this.pacsExtractor.extractAppHdrAndDocument(rawXmlFile);

      if (!document) {
        throw new Error('Document not found in the XML file');
      }

      if (!appHdr) {
        throw new Error('AppHdr not found in the XML file');
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
  }
}
