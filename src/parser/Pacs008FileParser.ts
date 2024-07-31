import { IFedwireParseInfo } from '../ParserTypes';
import { BasePacsFileParser } from './BasePacsFileParser';

export class Pacs008FileParser extends BasePacsFileParser {
  protected extractDocument(parsedResult: any): any {
    return parsedResult['urn:FedwireFundsIncoming']?.[
      'urn:FedwireFundsIncomingMessage'
    ]?.['urn:FedwireFundsCustomerCreditTransfer']?.['urn2:Document']?.[
      'urn2:FIToFICstmrCdtTrf'
    ];
  }

  protected parseDocument(document: any): IFedwireParseInfo {
    const groupHeader = document['urn2:GrpHdr'];
    const transaction = Array.isArray(document['urn2:CdtTrfTxInf'])
      ? document['urn2:CdtTrfTxInf'][0]
      : document['urn2:CdtTrfTxInf'];

    const senderAccountNumber = String(
      transaction['urn2:DbtrAcct']?.['urn2:Id']?.['urn2:Othr']?.['urn2:Id'] ||
        transaction['urn2:DbtrAcct']?.['urn2:Id']?.['urn2:IBAN'] ||
        '',
    );
    const beneficiaryFinancialInstitutionID = String(
      transaction['urn2:CdtrAgt']?.['urn2:FinInstnId']?.['urn2:ClrSysMmbId']?.[
        'urn2:MmbId'
      ] ||
        transaction['urn2:CdtrAgt']?.['urn2:FinInstnId']?.['urn2:BICFI'] ||
        '',
    );

    const beneficiaryFinancialInstitutionName =
      transaction['urn2:CdtrAgt']?.['urn2:FinInstnId']?.['urn2:Nm'] || '';
    const beneficiaryName = transaction['urn2:Cdtr']?.['urn2:Nm'] || '';
    const originatorID =
      transaction['urn2:DbtrAcct']?.['urn2:Id']?.['urn2:Othr']?.['urn2:Id'] ||
      transaction['urn2:DbtrAcct']?.['urn2:Id']?.['urn2:IBAN'] ||
      '';
    const originatorFI =
      transaction['urn2:DbtrAgt']?.['urn2:FinInstnId']?.['urn2:ClrSysMmbId']?.[
        'urn2:MmbId'
      ] ||
      transaction['urn2:DbtrAgt']?.['urn2:FinInstnId']?.['urn2:BICFI'] ||
      '';
    const OBI = transaction['urn2:RmtInf']?.['urn2:Ustrd'] || '';

    const OMAD = transaction['urn2:PmtId']?.['urn2:InstrId'] || '';
    const beneficiaryAccount =
      transaction['urn2:CdtrAcct']?.['urn2:Id']?.['urn2:IBAN'] || '';
    const originatorName = transaction['urn2:Dbtr']?.['urn2:Nm'] || '';
    const businessFunctionCode =
      transaction['urn2:PmtTpInf']?.['urn2:LclInstrm']?.['urn2:Prtry'] || '';
    const uniqueIdentifier = transaction['urn2:PmtId']?.['urn2:UETR'] || '';
    const creationDateTime = groupHeader['urn2:CreDtTm'] || '';

    const receiptTimestamp = groupHeader['urn2:CreDtTm'] || '';
    const IMAD = document['urn1:AppHdr']?.['urn1:BizMsgIdr'] || '';
    const paymentNotificationInfo =
      transaction['urn2:RmtInf']?.['urn2:Ustrd'] || '';
    const intermediaryFIInfo =
      transaction['urn2:IntrmyAgt1']?.['urn2:FinInstnId']?.['urn2:BICFI'] || '';

    const beneficiaryAddress = transaction['urn2:Cdtr']?.['urn2:PstlAdr'] || '';
    const originatorAddress = transaction['urn2:Dbtr']?.['urn2:PstlAdr'] || '';

    const result: IFedwireParseInfo = {
      MsgId: groupHeader['urn2:MsgId'],
      Amount: parseFloat(transaction['urn2:IntrBkSttlmAmt']?.['#text'] || '0'),
      SenderAccountNumber: senderAccountNumber,
      BeneficiaryFinancialInstitutionID: beneficiaryFinancialInstitutionID,
      BeneficiaryFinancialInstitutionName: beneficiaryFinancialInstitutionName,
      BeneficiaryName: beneficiaryName,
      OriginatorID: originatorID,
      OriginatorFI: originatorFI,
      OBI: OBI,
      BusinessFunctionCode: businessFunctionCode,
      CreationDateTime: creationDateTime,
      ReceiptTimestamp: receiptTimestamp,
      UniqueIdentifier: uniqueIdentifier,
      OriginatorName: originatorName,
      OMAD: OMAD,
      BeneficiaryAccount: beneficiaryAccount,
      IMAD: IMAD,
      PaymentNotificationInfo: paymentNotificationInfo,
      IntermediaryFIInfo: intermediaryFIInfo,
      BeneficiaryAddress: beneficiaryAddress,
      OriginatorAddress: originatorAddress,
    };

    return result;
  }
}
