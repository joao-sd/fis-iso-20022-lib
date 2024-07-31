import { IFedwireParseInfo } from '../ParserTypes';
import { BasePacsFileParser } from './BasePacsFileParser';

export class Pacs009FileParser extends BasePacsFileParser {
  protected extractDocument(parsedResult: any): any {
    return parsedResult['urn:FedwireFundsIncoming']?.[
      'urn:FedwireFundsIncomingMessage'
    ]?.['urn:FedwireFundsFinancialInstitutionCreditTransfer']?.[
      'urn2:Document'
    ]?.['urn2:FICdtTrf'];
  }

  protected parseDocument(document: any): IFedwireParseInfo {
    const groupHeader = document['urn2:GrpHdr'];
    const transaction = document['urn2:CdtTrfTxInf'];

    const amountField = transaction['urn2:IntrBkSttlmAmt'];
    const amount =
      typeof amountField === 'object' && amountField['#text']
        ? parseFloat(amountField['#text'])
        : typeof amountField === 'string'
          ? parseFloat(amountField)
          : 0;

    const beneficiaryFinancialInstitutionID =
      transaction['urn2:CdtrAgt']?.['urn2:FinInstnId']?.['urn2:BICFI'] || '';

    const beneficiaryName = transaction['urn2:Cdtr']?.['urn2:Nm'] || '';

    const originatorID =
      transaction['urn2:Dbtr']?.['urn2:FinInstnId']?.['urn2:ClrSysMmbId']?.[
        'urn2:MmbId'
      ] ||
      transaction['urn2:Dbtr']?.['urn2:FinInstnId']?.['urn2:BICFI'] ||
      '';

    const originatorFI =
      transaction['urn2:DbtrAgt']?.['urn2:FinInstnId']?.['urn2:BICFI'] || '';

    let OBI = '';
    const underlyingCustomerCreditTransfer =
      transaction['urn2:UndrlygCstmrCdtTrf'];
    if (underlyingCustomerCreditTransfer) {
      OBI =
        underlyingCustomerCreditTransfer['urn2:RmtInf']?.['urn2:Ustrd'] || '';
    } else {
      OBI = transaction['urn2:RmtInf']?.['urn2:Ustrd'] || '';
    }

    const OMAD = transaction['urn2:PmtId']?.['urn2:InstrId'] || '';
    const beneficiaryAccount =
      transaction['urn2:CdtrAcct']?.['urn2:Id']?.['urn2:IBAN'] || '';
    const originatorName = transaction['urn2:Dbtr']?.['urn2:Nm'] || '';
    const businessFunctionCode =
      transaction['urn2:PmtTpInf']?.['urn2:LclInstrm']?.['urn2:Prtry'] || '';
    const uniqueIdentifier = transaction['urn2:PmtId']?.['urn2:UETR'] || '';
    const creationDateTime = groupHeader['urn2:CreDtTm'] || '';

    const receiptTimestamp = groupHeader['urn2:CreDtTm'] || '';
    const IMAD = groupHeader['urn2:MsgId'] || '';
    const paymentNotificationInfo =
      transaction['urn2:RmtInf']?.['urn2:Ustrd'] || '';

    const result: IFedwireParseInfo = {
      MsgId: groupHeader['urn2:MsgId'],
      Amount: amount,
      SenderAccountNumber: '', // Not typically included in PACS.009
      BeneficiaryFinancialInstitutionID: beneficiaryFinancialInstitutionID,
      BeneficiaryName: beneficiaryName,
      OriginatorID: originatorID,
      OriginatorFI: originatorFI,
      OBI: OBI,
      BusinessFunctionCode: businessFunctionCode,
      CreationDateTime: creationDateTime,
      ReceiptTimestamp: receiptTimestamp,
      UniqueIdentifier: uniqueIdentifier,
      OriginatorName: originatorName,
      BeneficiaryAccount: beneficiaryAccount,
      PaymentNotificationInfo: paymentNotificationInfo,
    };

    if (OMAD) result.OMAD = OMAD;
    if (IMAD) result.IMAD = IMAD;

    return result;
  }
}
