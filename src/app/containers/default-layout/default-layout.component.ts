import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { AuthDataService } from '../../services/auth.service';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  isAdmin: boolean;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(private authService: AuthService, private auth: AuthDataService, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isAdmin = this.auth.isLoggedInUserIsAdmin();
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout() {
    this.auth.doLogout();
    this.authService.signOut();
  }
}
