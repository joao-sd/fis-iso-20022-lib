import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { DATA_PATH } from '../../constants/pathConstants';
import { PACSExtractor } from '../PACSExtractor';

describe('PACSExtractor', () => {
  let pacsExtractor: PACSExtractor;
  let xmlFilePath: string;

  beforeAll(() => {
    pacsExtractor = container.resolve(PACSExtractor);
    xmlFilePath = path.join(DATA_PATH, 'PACS009_CoverPayment.xml');
  });

  it('should extract AppHdr and Document from the XML file', () => {
    const xmlData = fs.readFileSync(xmlFilePath, 'utf-8');

    const { appHdr, document } =
      pacsExtractor.extractAppHdrAndDocument(xmlData);

    expect(appHdr).toBeDefined();
    expect(document).toBeDefined();
  });

  it("should return undefined for AppHdr and Document if they don't exist", () => {
    const xmlData = `<urn:FedwireFundsIncoming xmlns:urn="urn:fedwirefunds:incoming:v001"></urn:FedwireFundsIncoming>`;

    const { appHdr, document } =
      pacsExtractor.extractAppHdrAndDocument(xmlData);

    expect(appHdr).toBeUndefined();
    expect(document).toBeUndefined();
  });
});
