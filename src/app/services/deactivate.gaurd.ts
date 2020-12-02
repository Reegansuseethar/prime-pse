import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
  confirm(): boolean;
}

@Injectable()
export class DeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if(!component.confirm()) {
          if (confirm('You have unsaved changes! If you leave, your changes will be lost.')) {
          return true;
        } else {
          return false;
        }
      }
  }
}