import fs from 'fs';
import validateSchema from 'xsd-validator';

export class PACSValidator {
  public validateXml(xmlFilePath: string, xsdFilePath: string): boolean {
    try {
      const xmlString = fs.readFileSync(xmlFilePath, 'utf-8');
      const xsdString = fs.readFileSync(xsdFilePath, 'utf-8');
      const result = validateSchema(xmlString, xsdString);

      if (Array.isArray(result)) {
        console.error('Validation errors:', result);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Validation failed:', error);
      return false;
    }
  }
}
