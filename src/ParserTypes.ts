export interface IFedwireParseInfo {
  MsgId: string; // 1100 Message Disposition
  Amount: number; // 2000 Amount
  SenderAccountNumber: string; // 3100 Sender Account Number
  BeneficiaryFinancialInstitutionID: string; // 3400 Beneficiary Financial Institution ID Code
  BeneficiaryFinancialInstitutionName?: string; // 3400 Beneficiary Financial Institution Name
  BeneficiaryName: string; // 4200 Beneficiary Name
  OriginatorID: string; // 5000 Originator ID Code
  OriginatorFI: string; // 5100 Originator FI (Debtor Agent)
  OBI: string; // 6000 Originator To Beneficiary Information

  BeneficiaryAccount?: string; // 4200 Beneficiary Account
  OriginatorName?: string; // 5000 Originator Name
  BusinessFunctionCode?: string; // 3600 Business Function Code
  UniqueIdentifier?: string; // 4320 Unique Identifier
  CreationDateTime?: string; // Creation DateTime (not specified by tag)
  ReceiptTimestamp?: string; // 1110 Receipt Timestamp
  OMAD?: string; // 1120 OMAD
  IMAD?: string; // 1520 IMAD
  PaymentNotificationInfo?: string; // 3620 Payment Notification Information
  IntermediaryFIInfo?: string; // 4000 Intermediary FI Information
  BeneficiaryAddress?: string; // 4200 Beneficiary Address
  OriginatorAddress?: string; // 5000 Originator Address
}

type FedwireFieldMapping = {
  [K in keyof IFedwireParseInfo]-?: number | undefined;
};

export const fedwireFieldMapping: FedwireFieldMapping = {
  MsgId: 1100, // Message Disposition
  Amount: 2000, // Amount
  SenderAccountNumber: 3100, // Sender Account Number
  BeneficiaryFinancialInstitutionID: 3400, // Beneficiary Financial Institution ID Code
  BeneficiaryFinancialInstitutionName: 3400, // Beneficiary Financial Institution Name
  BeneficiaryName: 4200, // Beneficiary Name
  OriginatorID: 5000, // Originator ID Code
  OriginatorFI: 5100, // Originator FI (Debtor Agent)
  OBI: 6000, // Originator To Beneficiary Information
  BeneficiaryAccount: 4200, // Beneficiary Account
  OriginatorName: 5000, // Originator Name
  BusinessFunctionCode: 3600, // Business Function Code
  UniqueIdentifier: 4320, // Unique Identifier
  CreationDateTime: 0, // Creation DateTime (not specified by tag
  ReceiptTimestamp: 1110, // Receipt Timestamp
  OMAD: 1120, // OMAD
  IMAD: 1520, // IMAD
  PaymentNotificationInfo: 3620, // Payment Notification Information
  IntermediaryFIInfo: 4000, // Intermediary FI Information
  BeneficiaryAddress: 4200, // Beneficiary Address
  OriginatorAddress: 5000, // Originator Address
};
