import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import path from 'path';
import { DATA_PATH } from '../constants/pathConstants';
import { IFedwireParseInfo, fedwireFieldMapping } from '../ParserTypes';

export abstract class BasePacsFileParser {
  protected parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      allowBooleanAttributes: true,
      parseTagValue: true,
      trimValues: true,
    });
  }

  protected abstract parseDocument(document: any): IFedwireParseInfo;

  public parseXMLFile(filePath: string): IFedwireParseInfo | undefined {
    const xmlData = fs.readFileSync(filePath, 'utf-8');
    return this.parseXMLContent(xmlData, filePath);
  }

  public parseXMLContent(
    xmlData: string,
    filePath?: string,
  ): IFedwireParseInfo | undefined {
    const result = this.parser.parse(xmlData);

    // Save result locally for debugging if filePath is provided
    if (filePath) {
      const fileName = path.basename(filePath, path.extname(filePath));
      fs.writeFileSync(
        path.join(DATA_PATH, `${fileName}_parsed.json`),
        JSON.stringify(result, null, 2),
      );
    }

    const document = this.extractDocument(result);
    if (!document) {
      console.error('Invalid PACS file structure: Missing Document.');
      return;
    }

    return this.parseDocument(document);
  }

  public getIDFromKey(key: keyof IFedwireParseInfo): number {
    const id = fedwireFieldMapping[key];

    if (!id) {
      throw new Error(`Invalid key: ${key}`);
    }

    return id;
  }

  protected abstract extractDocument(parsedResult: any): any;
}
