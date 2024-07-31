import { BasePacsFileParser, IFedwireParseInfo } from './BasePacsFileParser';

export class Pacs004FileParser extends BasePacsFileParser {
  protected extractDocument(parsedResult: any): any {
    return parsedResult['urn:FedwireFundsIncoming']?.[
      'urn:FedwireFundsIncomingMessage'
    ]?.['urn:FedwireFundsPaymentReturn']?.['urn2:Document']?.['urn2:PmtRtr'];
  }

  protected parseDocument(document: any): IFedwireParseInfo {
    const groupHeader = document['urn2:GrpHdr'];
    const transaction = Array.isArray(document['urn2:TxInf'])
      ? document['urn2:TxInf'][0]
      : document['urn2:TxInf'];

    const senderAccountNumber = String(
      transaction['urn2:RtrChain']?.['urn2:DbtrAcct']?.['urn2:Id']?.[
        'urn2:Othr'
      ]?.['urn2:Id'] || '',
    );
    const beneficiaryFinancialInstitutionID = String(
      transaction['urn2:RtrChain']?.['urn2:CdtrAgt']?.['urn2:FinInstnId']?.[
        'urn2:ClrSysMmbId'
      ]?.['urn2:MmbId'] || '',
    );
    const beneficiaryFinancialInstitutionName =
      transaction['urn2:RtrChain']?.['urn2:CdtrAgt']?.['urn2:FinInstnId']?.[
        'urn2:Nm'
      ] || '';
    const beneficiaryName =
      transaction['urn2:RtrChain']?.['urn2:Cdtr']?.['urn2:Pty']?.['urn2:Nm'] ||
      '';
    const originatorID = String(
      transaction['urn2:RtrChain']?.['urn2:DbtrAcct']?.['urn2:Id']?.[
        'urn2:Othr'
      ]?.['urn2:Id'] || '',
    );
    const originatorFI =
      transaction['urn2:RtrChain']?.['urn2:DbtrAgt']?.['urn2:FinInstnId']?.[
        'urn2:ClrSysMmbId'
      ]?.['urn2:MmbId'] || '';
    const OBI = transaction['urn2:RtrRsnInf']?.['urn2:AddtlInf'] || '';

    const businessFunctionCode =
      transaction['urn2:OrgnlTxRef']?.['urn2:PmtTpInf']?.['urn2:LclInstrm']?.[
        'urn2:Prtry'
      ] || '';
    const beneficiaryAccount =
      transaction['urn2:RtrChain']?.['urn2:CdtrAcct']?.['urn2:Id']?.[
        'urn2:Othr'
      ]?.['urn2:Id'] || '';
    const originatorName =
      transaction['urn2:RtrChain']?.['urn2:Dbtr']?.['urn2:Pty']?.['urn2:Nm'] ||
      '';
    const uniqueIdentifier = transaction['urn2:OrgnlUETR'] || '';
    const creationDateTime = groupHeader['urn2:CreDtTm'] || '';

    const receiptTimestamp = groupHeader['urn2:CreDtTm'] || ''; // Receipt Timestamp
    const paymentNotificationInfo =
      transaction['urn2:RtrRsnInf']?.['urn2:AddtlInf'] || ''; // Payment Notification Information
    const intermediaryFIInfo =
      transaction['urn2:InstgAgt']?.['urn2:FinInstnId']?.['urn2:Nm'] || ''; // Intermediary FI Information (optional)
    const beneficiaryAddress =
      transaction['urn2:RtrChain']?.['urn2:Cdtr']?.['urn2:Pty']?.[
        'urn2:PstlAdr'
      ] || ''; // Beneficiary Address
    const originatorAddress =
      transaction['urn2:RtrChain']?.['urn2:Dbtr']?.['urn2:Pty']?.[
        'urn2:PstlAdr'
      ] || ''; // Originator Address

    const OMAD = groupHeader['urn2:MsgId'] || ''; // OMAD value

    return {
      MsgId: groupHeader['urn2:MsgId'],
      Amount: parseFloat(transaction['urn2:RtrdInstdAmt']?.['#text'] || '0'),
      SenderAccountNumber: senderAccountNumber,
      BeneficiaryFinancialInstitutionID: beneficiaryFinancialInstitutionID,
      BeneficiaryFinancialInstitutionName: beneficiaryFinancialInstitutionName,
      BeneficiaryName: beneficiaryName,
      OriginatorID: originatorID,
      OriginatorFI: originatorFI,
      OBI: OBI,
      BusinessFunctionCode: businessFunctionCode,
      BeneficiaryAccount: beneficiaryAccount,
      OriginatorName: originatorName,
      UniqueIdentifier: uniqueIdentifier,
      CreationDateTime: creationDateTime,
      ReceiptTimestamp: receiptTimestamp,
      PaymentNotificationInfo: paymentNotificationInfo,
      IntermediaryFIInfo: intermediaryFIInfo,
      BeneficiaryAddress: beneficiaryAddress,
      OriginatorAddress: originatorAddress,
      OMAD: OMAD, // Add the OMAD value to the return object
    };
  }
}
