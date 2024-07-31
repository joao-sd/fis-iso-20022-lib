# fedwire-iso-20022

A TypeScript library for handling Fedwire ISO 20022 messages.

## Parsing Coverage

The table below shows the coverage of our parsing algorithm

### PACS004

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
