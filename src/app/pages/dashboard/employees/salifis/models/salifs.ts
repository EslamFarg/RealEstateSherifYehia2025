export interface Salifs {
}


export interface AccountSalfis {
  id: number
  name: string
  type: string
  accountNumber: string
  iban: string
  parentId: number
  financiallyAccountId: number
}


export interface SalifsModal{
     id: number
  bookNumber: string
  advanceDate: string
  amount: number
  remainingAmount: number
  paidAmount: number
  description: string
  accountID: number
  employeeID: number
  employeeName: string
  accountName:string
}