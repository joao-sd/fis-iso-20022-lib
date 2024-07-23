import path from 'path';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { DATA_PATH } from '../../constants/pathConstants';
import { PACSValidator } from '../PACSValidator';

describe('PACSValidator', () => {
  let pacsValidator: PACSValidator;

  beforeAll(() => {
    pacsValidator = container.resolve(PACSValidator);
  });

  it('should validate the XML file against the XSD file', () => {
    const xmlFilePath = path.join(DATA_PATH, 'PACS009_CoverPayment.xml');
    const xsdFilePath = path.join(DATA_PATH, 'pacs.009.001.08.xsd');

    const result = pacsValidator.validateXml(xmlFilePath, xsdFilePath);

    expect(result).toBeTruthy();
  });

  it("should return an error if the XML file doesn't match the XSD file", () => {
    const xmlFilePath = path.join(DATA_PATH, 'PACS009_CoverPayment.xml');
    const xsdFilePath = path.join(DATA_PATH, 'pacs.008.001.08.xsd');

    const result = pacsValidator.validateXml(xmlFilePath, xsdFilePath);

    expect(result).toBeFalsy();
  });
});
