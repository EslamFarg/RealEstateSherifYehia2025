// export interface Apartment {
//         id: number,
//       name: string,
//       roomsCount: number,
//       unitType: string,
//       area: number,
//       floorNumber: number,
//       price: number,
//       description: string,
//       propertyID: number,
//       propertyName: string,
//       unitCategoryId: number,
//       paginationInfo: {
//     totalRowsCount: number,
//     totalPagesCount: number,
//     currentPageIndex: number
//   }
// }


export interface PaginationInfo {
  totalRowsCount: number;
  totalPagesCount: number;
  currentPageIndex: number;
}

export interface Apartment {
  id: number;
  name: string;
  roomsCount: number;
  unitType: string;
  area: number;
  floorNumber: number;
  price: number;
  description: string;
  propertyID: number;
  propertyName: string;
  unitCategoryId: number;
}

export interface ApartmentResponse {
  rows: Apartment[];
  paginationInfo: PaginationInfo | null;
}