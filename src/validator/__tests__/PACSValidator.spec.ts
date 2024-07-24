import path from 'path';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { DATA_PATH } from '../../constants/pathConstants';
import { PACSValidator } from '../PACSValidator';
import fs from 'fs';

describe('PACSValidator', () => {
  let pacsValidator: PACSValidator;

  beforeAll(() => {
    pacsValidator = container.resolve(PACSValidator);
  });

  describe('validateXmlByPath', () => {
    it('should validate the XML file against the correct XSD file', () => {
      const xmlFilePath = path.join(DATA_PATH, 'PACS009_CoverPayment.xml');
      const xsdFilePath = path.join(DATA_PATH, 'pacs.009.001.08.xsd');

      const result = pacsValidator.validateXmlByPath(xmlFilePath, xsdFilePath);

      expect(result).toBeTruthy();
    });

    it("should return false if the XML file doesn't match the XSD file", () => {
      const xmlFilePath = path.join(DATA_PATH, 'PACS009_CoverPayment.xml');
      const xsdFilePath = path.join(DATA_PATH, 'pacs.008.001.08.xsd');

      const result = pacsValidator.validateXmlByPath(xmlFilePath, xsdFilePath);

      expect(result).toBeFalsy();
    });

    it("should return false if the XML file doesn't have AppHdr", () => {
      const xmlFilePath = path.join(DATA_PATH, 'InvalidPACS_NoAppHdr.xml');
      const xsdFilePath = path.join(DATA_PATH, 'pacs.009.001.08.xsd');

      const result = pacsValidator.validateXmlByPath(xmlFilePath, xsdFilePath);

      expect(result).toBeFalsy();
    });

    it("should return false if the XML file doesn't have Document", () => {
      const xmlFilePath = path.join(DATA_PATH, 'InvalidPACS_NoDocument.xml');
      const xsdFilePath = path.join(DATA_PATH, 'pacs.009.001.08.xsd');

      const result = pacsValidator.validateXmlByPath(xmlFilePath, xsdFilePath);

      expect(result).toBeFalsy();
    });

    it('should return false if the XSD file is invalid', () => {
      const xmlFilePath = path.join(DATA_PATH, 'PACS009_CoverPayment.xml');
      const xsdFilePath = path.join(DATA_PATH, 'InvalidXSD.xsd');

      const result = pacsValidator.validateXmlByPath(xmlFilePath, xsdFilePath);

      expect(result).toBeFalsy();
    });

    it('should return false if the XML file is malformed', () => {
      const xmlFilePath = path.join(
        DATA_PATH,
        'MalformedPACS009_CoverPayment.xml',
      );
      const xsdFilePath = path.join(DATA_PATH, 'pacs.009.001.08.xsd');

      const result = pacsValidator.validateXmlByPath(xmlFilePath, xsdFilePath);

      expect(result).toBeFalsy();
    });
  });

  describe('validateXMLContent', () => {
    it('should validate the XML content against the correct XSD file', () => {
      const xmlContent = fs.readFileSync(
        path.join(DATA_PATH, 'PACS009_CoverPayment.xml'),
        'utf-8',
      );
      const result = pacsValidator.validateXMLContent(xmlContent, 'pacs009');

      expect(result).toBeTruthy();
    });

    it("should return false if the XML content doesn't match the XSD file", () => {
      const xmlContent = fs.readFileSync(
        path.join(DATA_PATH, 'PACS009_CoverPayment.xml'),
        'utf-8',
      );
      const result = pacsValidator.validateXMLContent(xmlContent, 'pacs008');

      expect(result).toBeFalsy();
    });

    it('should return false if the XSD file is invalid', () => {
      const xmlContent = fs.readFileSync(
        path.join(DATA_PATH, 'PACS009_CoverPayment.xml'),
        'utf-8',
      );
      const invalidXSDPath = path.join(DATA_PATH, 'InvalidXSD.xsd');
      fs.writeFileSync(invalidXSDPath, 'invalid xsd content'); // Creating an invalid XSD file for testing

      //@ts-ignore
      const result = pacsValidator.validateAgainstXSD(
        xmlContent,
        invalidXSDPath,
      );

      expect(result).toBeFalsy();

      fs.unlinkSync(invalidXSDPath); // Clean up the invalid XSD file
    });

    it('should return false if the XML content is malformed', () => {
      const xmlContent = fs.readFileSync(
        path.join(DATA_PATH, 'MalformedPACS009_CoverPayment.xml'),
        'utf-8',
      );

      const result = pacsValidator.validateXMLContent(xmlContent, 'pacs009');

      expect(result).toBeFalsy();
    });
  });
});
