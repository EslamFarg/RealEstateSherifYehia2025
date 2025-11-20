import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const requiredPageId = this.getPageIdFromRoute(route);
    const user = this.getUserFromLocalStorage();

    // If no pageId assigned → allow access
    if (requiredPageId == null) {
      return true;
    }

    // ✅ ADMIN CASE: both groups and pageGroups are empty → allow all
    const isAdmin =
      Array.isArray(user?.groups) &&
      Array.isArray(user?.pageGroups) &&
      user.groups.length === 0 &&
      user.pageGroups.length === 0;

    if (isAdmin) {
      return true;
    }

    // Normal users → use pageGroups to check permissions
    const allowed = this.extractAllowedPageIds(user);
    const allowedIds = allowed ?? new Set<number>();

    if (allowedIds.has(requiredPageId)) {
      return true;
    }

    // Not allowed → redirect
    return this.router.createUrlTree(['/dashboard/unauthorized'], {
      queryParams: { attempted: state.url }
    });
  }

  private getPageIdFromRoute(route: ActivatedRouteSnapshot): number | null {
    const dataPageId = route.data?.['pageId'];
    if (typeof dataPageId === 'number') return dataPageId;
    if (typeof dataPageId === 'string' && !isNaN(Number(dataPageId))) return Number(dataPageId);
    return null;
  }

  private getUserFromLocalStorage(): any | null {
    try {
      const raw = localStorage.getItem('payloadUser');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  private extractAllowedPageIds(userObj: any): Set<number> | null {
    if (!userObj || !Array.isArray(userObj.pageGroups)) return null;

    const ids = new Set<number>();

    for (const pg of userObj.pageGroups) {
      if (!pg || typeof pg !== 'object') continue;
      const pageId = pg.pageId ?? pg.pageID ?? pg.id ?? pg.page_id ?? null;
      if (pageId != null && pageId !== '') {
        const numeric = Number(pageId);
        if (!Number.isNaN(numeric)) ids.add(numeric);
      }
    }

    return ids.size ? ids : null;
  }
}
