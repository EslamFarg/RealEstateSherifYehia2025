import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
interface SidebarLink {
  label: string;
  route: string;
  id?: number;
}

interface SidebarGroup {
  title: string;
  links: SidebarLink[];
  collapsed?: boolean; // optional: default collapsed state
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit{
  @Input() showSidebar: any = false;
  @Output() handlehideoverlay = new EventEmitter<any>();
  groups: SidebarGroup[] = [
    {
      title: 'البيانات الرئيسيه',
      links: [
        {
          label: 'لوحه التحكم',
          route: 'dashboard',
          id: 41,
        },
        { label: 'المالك', route: 'owner', id: 1 },
        { label: 'السمسار', route: 'realtor', id: 2 },
        { label: 'المستأجر', route: 'tenant', id: 3 },
        { label: 'العقار', route: 'building', id: 4 },
        { label: 'الوحده', route: 'apartment', id: 5 },
        { label: 'تصنيف الوحده', route: 'classification', id: 6 },
        { label: 'شجره العقار', route: 'treereal', id: 37 },
      ],
    },
    {
      title: 'الصيانه',
      links: [
        { label: 'الصيانه', route: 'maintenance', id: 7 },
        { label: 'نوع الصيانه', route: 'typemaintenance', id: 8 },
      ],
    },
    {
      title: 'الموظفين',
      links: [
        { label: 'الموظفين', route: 'employees', id: 9 },
        { label: 'صرف الرواتب', route: 'salarydisbursement', id: 10 },
        { label: 'السلفيات', route: 'salifis', id: 11 },
      ],
    },
    {
      title: 'المستخدمين',
      links: [
        { label: 'مستخدم جديد', route: 'newuser', id: 12 },
        { label: 'المجموعه', route: 'groupusers', id: 13 },
        { label: 'تتبع النشاط', route: 'activitytracking', id: 14 },
        { label: 'ربط الصفحه بالصلاحيه', route: 'linkpagepermission', id: 15 },
        { label: 'ربط المجموعه بالصفحه', route: 'linkgrouppage', id: 16 },
        {
          label: 'تعديل اسماء الصلاحيه',
          route: 'modifynamepermission',
          id: 38,
        },
        {
          label: 'ربط المجموعات بالصلاحيات',
          route: 'concatgrouppermission',
          id: 17,
        },
      ],
    },
    {
      title: 'الرسايل',
      links: [
        { label: 'نموذج الرسايل', route: 'msgform', id: 18 },
        { label: 'ارسال رساله', route: 'sendmessage', id: 19 },
        { label: 'اعداد الرسايل', route: 'messagesetting', id: 20 },
        { label: 'مجمع الرسايل', route: 'groupmessage', id: 21 },
      ],
    },
    {
      title: 'الاعدادات',
      links: [
        { label: 'الملف الشخصي', route: 'profilesettings', id: 22 },
        { label: 'البيانات الرئيسيه', route: 'maindata', id: 25 },
      ],
    },
    {
      title: 'العقود',
      links: [
        { label: 'اضافه عقد', route: 'addcontract', id: 27 },
        { label: 'استعلام عن عقد', route: 'querycontract', id: 39 },
      ],
    },
    {
      title: 'المحاسبه',
      links: [
        {
          label: 'سند الصرف خاص بالمالك والشركه',
          route: 'paymentvoucher',
          id: 28,
        },
        {
          label: 'سند الصرف خاص بالسمسار',
          route: 'realtorpaymentvoucher',
          id: 29,
        },
        { label: 'استلام الدفعات', route: 'paymentreceiptvoucher', id: 30 },
        { label: 'سند القبض', route: 'receiptvoucher', id: 31 },
        { label: 'سند الصرف', route: 'paymentvouchernormal', id: 32 },
        { label: 'الحسابات', route: 'accounts', id: 36 },
        { label: 'كشف الحساب', route: 'accountstatement', id: 34 },
        { label: 'ارصده افتتاحيه', route: 'editorialcredits', id: 35 },
        { label: 'كارت الحساب', route: 'accountcard', id: 40 },
      ],
    },
  ];
  filteredGroups: SidebarGroup[] = [];
  ngOnInit(): void {    
    let md = window.matchMedia('(max-width:992px)');
    md.addEventListener('change', (e: any) => {
      if (e.matches) {
        this.showSidebar = false;
      }
    });
       // build filteredGroups based on localStorage permissions
    const user = this.getUserFromLocalStorage();
    const allowedIds = this.extractAllowedPageIds(user);

    if (allowedIds && allowedIds.size > 0) {
      this.filteredGroups = this.groups
        .map(g => ({ ...g, links: g.links.filter(l => allowedIds.has(Number(l.id))) }))
        .filter(g => g.links && g.links.length > 0);
    } else {
      // if no permissions found, fallback to showing all (useful for dev/testing)
      this.filteredGroups = [...this.groups];
    }
  }

  handleClick() {
    let md = window.matchMedia('(max-width:992px)');

    if (md.matches) {
      this.showSidebar = false;
      this.handlehideoverlay.emit(false);
    }
  }
  // trackBy functions to help Angular's rendering
  trackByGroup(index: number, group: SidebarGroup) {
    return group.title || index;
  }

  trackByLink(index: number, link: SidebarLink) {
    return link.route || index;
  }

   private getUserFromLocalStorage(): any | null {
    const commonKeys = ['payloadUser'];
    for (const k of commonKeys) {
      try {
        const raw = localStorage.getItem(k);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (parsed && parsed.pageGroups) return parsed;
      } catch {
        // ignore parse errors
      }
    }

    // fallback: scan all keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (parsed && parsed.pageGroups) return parsed;
      } catch {
        // skip invalid JSON
      }
    }

    return null;
  }

  /**
   * Extracts pageId values from pageGroups array. Handles different property names
   * like pageId, pageID, id, page_id.
   */
  private extractAllowedPageIds(userObj: any): Set<number> | null {
    if (!userObj || !Array.isArray(userObj.pageGroups)) return null;

    const ids = new Set<number>();
    for (const pg of userObj.pageGroups) {
      if (!pg || typeof pg !== 'object') continue;
      const pageId =
        pg.pageId ?? pg.pageID ?? pg.id ?? pg.page_id ?? pg.PageId ?? null;
      if (pageId != null && pageId !== '') {
        const numeric = Number(pageId);
        if (!Number.isNaN(numeric)) ids.add(numeric);
      }
    }

    return ids.size ? ids : null;
  }
}
