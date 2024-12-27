import {Component, inject} from '@angular/core';
import {LocalStorageUtil} from '../../../@core/utils/local-storage-utils';
import {environment} from '../../../../environment/environment';
import {SidebarService} from './sidebar/sidebar.service';
import {FooterComponent} from './footer/footer.component';
import {Router, RouterOutlet} from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-base',
  imports: [
    FooterComponent,
    RouterOutlet,
    SidebarComponent,
    NgIf
  ],
  templateUrl: './base.component.html',
  standalone: true,
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  isExpanded = true;
  userFullName = 'Shristi Sapal';
  roleTitle = 'Super Admin';
  showDropdown: boolean = false;
  storage = LocalStorageUtil.getStorage();

  router: Router = inject(Router);

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isExpanded$.subscribe(
      (isExpanded) => this.isExpanded = isExpanded
    );
  }


  ngOnInit() {

  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  viewProfile() {

  }

  logout() {
    this.router.navigate(['/login']);
  }
}
