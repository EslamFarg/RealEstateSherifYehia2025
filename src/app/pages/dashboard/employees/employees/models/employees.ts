export interface Employees {

  id: number
  name: string
  nationality: string
  mobile: string
  email: string
  address: string
  nationalID: string
  salary: number
  paginationInfo:{
     totalRowsCount: number,
    totalPagesCount: number,
    currentPageIndex: number
  }
}
