export interface Newuser {

       userId: string,
    userName: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    imageUrl: string,
    createdAt: string,
    isActive:boolean,
    groupName:string
      groupIds?: number[]; // IDs فقط إذا تحتاجها
  groups?: {
    groupId: number;
    groupName: string;
  }[]; // ✅ أضف هذا

}
