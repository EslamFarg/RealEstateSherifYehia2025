export interface Tenant {
  id?: number;        // ممكن يكون أوتوماتيك من قاعدة البيانات
  name: string;       // اسم المستأجر
  nationalId: string; // رقم الهوية
  phone: string;      // رقم الجوال
  companions: number; // عدد المرافقين
}


export interface nationality{
    code:string,
    nationality_ar:string
}

export interface Apartments {
  id: number;             // م
  name: string;           // اسم المرافق
  nationalId: string;     // رقم الهوية
  mobile: string;         // رقم الجوال
  nationalID?:string
  nationality: string;    // الجنسية
  relation: string;       // الصلة
}


export interface TenantData {
   id: number,
      name: string,
      tenantType: string,
      nationality: string,
      mobile: string,
      email: string,
      nationalID: string,
      
      jobTitle: string,
      dependants:[],
}