# fedwire-iso-20022

A TypeScript library for handling Fedwire ISO 20022 messages.

## Parsing Coverage

The table below shows the coverage of our parsing algorithm

### PACS004

<details>
<summary> 
Click to expand the PACS.004 coverage report
</summary>

| Field                                  | Available on Parser | Available on XML | Notes                                                                                           |
| -------------------------------------- | ------------------- | ---------------- | ----------------------------------------------------------------------------------------------- |
| Message Disposition                    | ❌                  | ❌               |                                                                                                 |
| Receipt Timestamp                      | ✅                  | ✅               | `<urn2:GrpHdr> <urn2:CreDtTm>`                                                                  |
| OMAD                                   | ❌                  | ✅               | `<urn2:GrpHdr> <urn2:MsgId>` determines the OMAD value                                          |
| Error Tag                              | ❌                  | ❌               |                                                                                                 |
| Format Version                         | ❌                  | ❌               |                                                                                                 |
| User Request Data                      | ❌                  | ❌               |                                                                                                 |
| Type SubType Tag                       | ❌                  | ❌               |                                                                                                 |
| Type SubType Code                      | ❌                  | ❌               |                                                                                                 |
| IMAD                                   | ❌                  | ❌               |                                                                                                 |
| Amount                                 | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrdIntrBkSttlmAmt>` or `<urn2:TxInf> <urn2:IntrBkSttlmAmt>`                |
| Sender Account Number                  | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:DbtrAcct> <urn2:Id> <urn2:Othr> <urn2:Id>`                  |
| Sender Account Name                    | ❌                  | ❌               |                                                                                                 |
| Beneficiary Financial Institution ID   | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:CdtrAgt> <urn2:FinInstnId> <urn2:ClrSysMmbId> <urn2:MmbId>` |
| Beneficiary Financial Institution Name | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:CdtrAgt> <urn2:FinInstnId> <urn2:Nm>`                       |
| Business Function Code                 | ✅                  | ✅               | `<urn2:TxInf> <urn2:OrgnlTxRef> <urn2:PmtTpInf> <urn2:LclInstrm> <urn2:Prtry>`                  |
| Payment Notification Information       | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrRsnInf> <urn2:AddtlInf>`                                                 |
| Payment Notification Contact Name      | ❌                  | ❌               |                                                                                                 |
| Payment Notification Contact Phone     | ❌                  | ❌               |                                                                                                 |
| Payment Notification Contact Mobile    | ❌                  | ❌               |                                                                                                 |
| Payment Notification Contact Fax       | ❌                  | ❌               |                                                                                                 |
| Payment Notification End to End ID     | ❌                  | ❌               |                                                                                                 |
| Intermediary FI Bank Type              | ❌                  | ❌               |                                                                                                 |
| Intermediary FI ID                     | ✅                  | ✅               | `<urn2:TxInf> <urn2:InstgAgt> <urn2:FinInstnId> <urn2:ClrSysMmbId> <urn2:MmbId>`                |
| Intermediary FI Name                   | ✅                  | ✅               | `<urn2:TxInf> <urn2:InstgAgt> <urn2:FinInstnId> <urn2:Nm>`                                      |
| Intermediary FI Address1               | ✅                  | ✅               | `<urn2:TxInf> <urn2:InstgAgt> <urn2:FinInstnId> <urn2:PstlAdr>`                                 |
| Intermediary FI Address2               | ✅                  | ✅               | `<urn2:TxInf> <urn2:InstgAgt> <urn2:FinInstnId> <urn2:PstlAdr>`                                 |
| Intermediary FI Address3               | ✅                  | ✅               | `<urn2:TxInf> <urn2:InstgAgt> <urn2:FinInstnId> <urn2:PstlAdr>`                                 |
| Beneficiary Financial Institution ID   | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:CdtrAgt> <urn2:FinInstnId> <urn2:ClrSysMmbId> <urn2:MmbId>` |
| Beneficiary Code - F                   | ✅                  | ✅               | `<urn2:TxInf> <urn2:CdtrAcct> <urn2:Id> <urn2:IBAN>`                                            |
| Beneficiary Name                       | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:Cdtr> <urn2:Nm>`                                            |
| Beneficiary Address1                   | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:Cdtr> <urn2:PstlAdr> <urn2:StrtNm>`                         |
| Beneficiary Address2                   | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:Cdtr> <urn2:PstlAdr> <urn2:BldgNb>`                         |
| Beneficiary Address3                   | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:Cdtr> <urn2:PstlAdr> <urn2:TwnNm>`                          |
| Unique Identifier                      | ✅                  | ✅               | `<urn2:TxInf> <urn2:OrgnlUETR>`                                                                 |
| Originator ID Code - D                 | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:DbtrAcct> <urn2:Id> <urn2:IBAN>`                            |
| Originator ID                          | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:DbtrAcct> <urn2:Id> <urn2:IBAN>`                            |
| Originator Name                        | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:Dbtr> <urn2:Nm>`                                            |
| Originator Address1                    | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:Dbtr> <urn2:PstlAdr> <urn2:StrtNm>`                         |
| Originator Address2                    | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:Dbtr> <urn2:PstlAdr> <urn2:BldgNb>`                         |
| Originator Address3                    | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:Dbtr> <urn2:PstlAdr> <urn2:TwnNm>`                          |
| Originator FI                          | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrChain> <urn2:DbtrAgt> <urn2:FinInstnId> <urn2:ClrSysMmbId> <urn2:MmbId>` |
| Originator To Beneficiary (OBI) 1      | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrRsnInf> <urn2:AddtlInf>`                                                 |
| Originator To Beneficiary (OBI) 2      | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrRsnInf> <urn2:AddtlInf>`                                                 |
| Originator To Beneficiary (OBI) 3      | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrRsnInf> <urn2:AddtlInf>`                                                 |
| Originator To Beneficiary (OBI) 4      | ✅                  | ✅               | `<urn2:TxInf> <urn2:RtrRsnInf> <urn2:AddtlInf>`                                                 |

</details>

### PACS008

<details>
  <summary>Click to expand the PACS.008 coverage report</summary>

| Field                                  | Available on Parser | Available on XML | Notes                                                                                                                                                       |
| -------------------------------------- | ------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Message Disposition                    | ❌                  | ❌               |                                                                                                                                                             |
| Receipt Timestamp                      | ✅                  | ✅               | `<urn2:GrpHdr> <urn2:CreDtTm>`                                                                                                                              |
| OMAD                                   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:PmtId> <urn2:InstrId>`                                                                                                            |
| Error Tag                              | ❌                  | ❌               |                                                                                                                                                             |
| Format Version                         | ❌                  | ❌               |                                                                                                                                                             |
| User Request Data                      | ❌                  | ❌               |                                                                                                                                                             |
| Type SubType Tag                       | ❌                  | ❌               |                                                                                                                                                             |
| Type SubType Code                      | ❌                  | ❌               |                                                                                                                                                             |
| IMAD                                   | ✅                  | ✅               | `<urn1:AppHdr> <urn1:BizMsgIdr>`                                                                                                                            |
| Amount                                 | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:IntrBkSttlmAmt>`                                                                                                                  |
| Sender Account Number                  | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:DbtrAcct> <urn2:Id> <urn2:Othr> <urn2:Id>` or `<urn2:CdtTrfTxInf> <urn2:DbtrAcct> <urn2:Id> <urn2:IBAN>`                          |
| Sender Account Name                    | ❌                  | ❌               |                                                                                                                                                             |
| Beneficiary Financial Institution ID   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:CdtrAgt> <urn2:FinInstnId> <urn2:ClrSysMmbId> <urn2:MmbId>` or `<urn2:CdtTrfTxInf> <urn2:CdtrAgt> <urn2:FinInstnId> <urn2:BICFI>` |
| Beneficiary Financial Institution Name | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:CdtrAgt> <urn2:FinInstnId> <urn2:Nm>`                                                                                             |
| Business Function Code                 | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:PmtTpInf> <urn2:LclInstrm> <urn2:Prtry>`                                                                                          |
| Payment Notification Information       | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:RmtInf> <urn2:Ustrd>`                                                                                                             |
| Payment Notification Contact Name      | ❌                  | ❌               |                                                                                                                                                             |
| Payment Notification Contact Phone     | ❌                  | ❌               |                                                                                                                                                             |
| Payment Notification Contact Mobile    | ❌                  | ❌               |                                                                                                                                                             |
| Payment Notification Contact Fax       | ❌                  | ❌               |                                                                                                                                                             |
| Payment Notification End to End ID     | ❌                  | ❌               |                                                                                                                                                             |
| Intermediary FI Bank Type              | ❌                  | ❌               |                                                                                                                                                             |
| Intermediary FI ID                     | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:IntrmyAgt1> <urn2:FinInstnId> <urn2:BICFI>`                                                                                       |
| Intermediary FI Name                   | ❌                  | ❌               |                                                                                                                                                             |
| Intermediary FI Address1               | ❌                  | ❌               |                                                                                                                                                             |
| Intermediary FI Address2               | ❌                  | ❌               |                                                                                                                                                             |
| Intermediary FI Address3               | ❌                  | ❌               |                                                                                                                                                             |
| Beneficiary Financial Institution ID   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:CdtrAgt> <urn2:FinInstnId> <urn2:ClrSysMmbId> <urn2:MmbId>` or `<urn2:CdtTrfTxInf> <urn2:CdtrAgt> <urn2:FinInstnId> <urn2:BICFI>` |
| Beneficiary Code - F                   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:CdtrAcct> <urn2:Id> <urn2:IBAN>`                                                                                                  |
| Beneficiary Name                       | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Cdtr> <urn2:Nm>`                                                                                                                  |
| Beneficiary Address1                   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Cdtr> <urn2:PstlAdr> <urn2:StrtNm>`                                                                                               |
| Beneficiary Address2                   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Cdtr> <urn2:PstlAdr> <urn2:BldgNb>`                                                                                               |
| Beneficiary Address3                   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Cdtr> <urn2:PstlAdr> <urn2:TwnNm>`                                                                                                |
| Unique Identifier                      | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:PmtId> <urn2:UETR>`                                                                                                               |
| Originator ID Code - D                 | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:DbtrAcct> <urn2:Id> <urn2:Othr> <urn2:Id>` or `<urn2:CdtTrfTxInf> <urn2:DbtrAcct> <urn2:Id> <urn2:IBAN>`                          |
| Originator ID                          | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:DbtrAcct> <urn2:Id> <urn2:Othr> <urn2:Id>` or `<urn2:CdtTrfTxInf> <urn2:DbtrAcct> <urn2:Id> <urn2:IBAN>`                          |
| Originator Name                        | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Dbtr> <urn2:Nm>`                                                                                                                  |
| Originator Address1                    | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Dbtr> <urn2:PstlAdr> <urn2:StrtNm>`                                                                                               |
| Originator Address2                    | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Dbtr> <urn2:PstlAdr> <urn2:BldgNb>`                                                                                               |
| Originator Address3                    | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Dbtr> <urn2:PstlAdr> <urn2:TwnNm>`                                                                                                |
| Originator FI                          | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:DbtrAgt> <urn2:FinInstnId> <urn2:ClrSysMmbId> <urn2:MmbId>` or `<urn2:CdtTrfTxInf> <urn2:DbtrAgt> <urn2:FinInstnId> <urn2:BICFI>` |
| Originator To Beneficiary (OBI) 1      | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:RmtInf> <urn2:Ustrd>`                                                                                                             |
| Originator To Beneficiary (OBI) 2      | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:RmtInf> <urn2:Ustrd>`                                                                                                             |
| Originator To Beneficiary (OBI) 3      | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:RmtInf> <urn2:Ustrd>`                                                                                                             |
| Originator To Beneficiary (OBI) 4      | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:RmtInf> <urn2:Ustrd>`                                                                                                             |

  </details>

### PACS009

<details>
  <summary>Click to expand the PACS.009 report</summary>

| Field                                  | Available on Parser | Available on XML | Notes                                                                                                                                                 |
| -------------------------------------- | ------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Message Disposition                    | ❌                  | ❌               |                                                                                                                                                       |
| Receipt Timestamp                      | ✅                  | ✅               | `<urn2:GrpHdr> <urn2:CreDtTm>`                                                                                                                        |
| OMAD                                   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:PmtId> <urn2:InstrId>`                                                                                                      |
| Error Tag                              | ❌                  | ❌               |                                                                                                                                                       |
| Format Version                         | ❌                  | ❌               |                                                                                                                                                       |
| User Request Data                      | ❌                  | ❌               |                                                                                                                                                       |
| Type SubType Tag                       | ❌                  | ❌               |                                                                                                                                                       |
| Type SubType Code                      | ❌                  | ❌               |                                                                                                                                                       |
| IMAD                                   | ✅                  | ✅               | `<urn2:GrpHdr> <urn2:MsgId>`                                                                                                                          |
| Amount                                 | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:IntrBkSttlmAmt>`                                                                                                            |
| Sender Account Number                  | ❌                  | ❌               | Not typically included in PACS.009                                                                                                                    |
| Sender Account Name                    | ❌                  | ❌               |                                                                                                                                                       |
| Beneficiary Financial Institution ID   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:CdtrAgt> <urn2:FinInstnId> <urn2:BICFI>`                                                                                    |
| Beneficiary Financial Institution Name | ❌                  | ❌               |                                                                                                                                                       |
| Business Function Code                 | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:PmtTpInf> <urn2:LclInstrm> <urn2:Prtry>`                                                                                    |
| Payment Notification Information       | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:RmtInf> <urn2:Ustrd>`                                                                                                       |
| Payment Notification Contact Name      | ❌                  | ❌               |                                                                                                                                                       |
| Payment Notification Contact Phone     | ❌                  | ❌               |                                                                                                                                                       |
| Payment Notification Contact Mobile    | ❌                  | ❌               |                                                                                                                                                       |
| Payment Notification Contact Fax       | ❌                  | ❌               |                                                                                                                                                       |
| Payment Notification End to End ID     | ❌                  | ❌               |                                                                                                                                                       |
| Intermediary FI Bank Type              | ❌                  | ❌               |                                                                                                                                                       |
| Intermediary FI ID                     | ❌                  | ❌               |                                                                                                                                                       |
| Intermediary FI Name                   | ❌                  | ❌               |                                                                                                                                                       |
| Intermediary FI Address1               | ❌                  | ❌               |                                                                                                                                                       |
| Intermediary FI Address2               | ❌                  | ❌               |                                                                                                                                                       |
| Intermediary FI Address3               | ❌                  | ❌               |                                                                                                                                                       |
| Beneficiary Financial Institution ID   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:CdtrAgt> <urn2:FinInstnId> <urn2:BICFI>`                                                                                    |
| Beneficiary Code - F                   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:CdtrAcct> <urn2:Id> <urn2:IBAN>`                                                                                            |
| Beneficiary Name                       | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Cdtr> <urn2:Nm>`                                                                                                            |
| Beneficiary Address1                   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:UndrlygCstmrCdtTrf> <urn2:Cdtr> <urn2:PstlAdr> <urn2:StrtNm>`                                                               |
| Beneficiary Address2                   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:UndrlygCstmrCdtTrf> <urn2:Cdtr> <urn2:PstlAdr> <urn2:BldgNb>`                                                               |
| Beneficiary Address3                   | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:UndrlygCstmrCdtTrf> <urn2:Cdtr> <urn2:PstlAdr> <urn2:TwnNm>`                                                                |
| Unique Identifier                      | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:PmtId> <urn2:UETR>`                                                                                                         |
| Originator ID Code - D                 | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Dbtr> <urn2:FinInstnId> <urn2:ClrSysMmbId> <urn2:MmbId>` or `<urn2:CdtTrfTxInf> <urn2:Dbtr> <urn2:FinInstnId> <urn2:BICFI>` |
| Originator ID                          | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Dbtr> <urn2:FinInstnId> <urn2:ClrSysMmbId> <urn2:MmbId>` or `<urn2:CdtTrfTxInf> <urn2:Dbtr> <urn2:FinInstnId> <urn2:BICFI>` |
| Originator Name                        | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Dbtr> <urn2:Nm>`                                                                                                            |
| Originator Address1                    | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Dbtr> <urn2:PstlAdr> <urn2:StrtNm>`                                                                                         |
| Originator Address2                    | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Dbtr> <urn2:PstlAdr> <urn2:BldgNb>`                                                                                         |
| Originator Address3                    | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:Dbtr> <urn2:PstlAdr> <urn2:TwnNm>`                                                                                          |
| Originator FI                          | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:DbtrAgt> <urn2:FinInstnId> <urn2:BICFI>`                                                                                    |
| Originator To Beneficiary (OBI) 1      | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:UndrlygCstmrCdtTrf> <urn2:RmtInf> <urn2:Ustrd>`                                                                             |
| Originator To Beneficiary (OBI) 2      | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:UndrlygCstmrCdtTrf> <urn2:RmtInf> <urn2:Ustrd>`                                                                             |
| Originator To Beneficiary (OBI) 3      | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:UndrlygCstmrCdtTrf> <urn2:RmtInf> <urn2:Ustrd>`                                                                             |
| Originator To Beneficiary (OBI) 4      | ✅                  | ✅               | `<urn2:CdtTrfTxInf> <urn2:UndrlygCstmrCdtTrf> <urn2:RmtInf> <urn2:Ustrd>`                                                                             |

</details>
