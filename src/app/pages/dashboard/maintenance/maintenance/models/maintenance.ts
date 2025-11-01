export interface Maintenance {
}

export interface RowMaintenace {
  id: number
  bookNumber: string
  requestDate: string
  targetType: number
  targetId: number
  targetName: string
  maintenanceTypeId: number
  maintenanceTypeName: string
  employeeId: number
  employeeName: string
  accountId: number
  accountName: string
  status: string
  amount: number
  notes: string
  unitName: string,
  buildingName:string
  attachments: AttachmentMaintenace[]
}

export interface AttachmentMaintenace {
  id: number
  fileName: string
  filePath: string
  fileType: string
  uploadedAt: string
}

export interface PaginationInfoMaintenace {
  totalRowsCount: number
  totalPagesCount: number
  currentPageIndex: number
}
