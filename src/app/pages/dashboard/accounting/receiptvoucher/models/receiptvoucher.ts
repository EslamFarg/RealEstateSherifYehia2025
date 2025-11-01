export interface ReceiptVoucher {
  id: number
  voucherNo: any
  voucherDate: string
  paymentMethod: string
  net: number
  tax: number
  notes: string
  debitAccountNumber: number
  debitAccountName: string
  creditAccountNumber: number
  creditAccountName: string   
  taxValue:string 
totalWithTax:string 

 paginationInfo: {
    totalRowsCount: number,
    totalPagesCount: number
  }
}