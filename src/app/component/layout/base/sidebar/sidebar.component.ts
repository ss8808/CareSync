import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SidebarService} from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent{

  isExpanded = true;

  menuItems = [
    {
      icon: 'bi-speedometer2',
      label: 'Dashboard',
      path: '/base/dashboard'
    },
    {
      icon: 'bi-people-fill',
      label: 'Users',
      path: '/layout/user'
    },
    {
      icon: 'bi bi-heart-pulse',
      label: 'Doctors',
      path: '/doctors'
    }
  ];

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.isExpanded$.subscribe(
      (isExpanded) => this.isExpanded = isExpanded
    );
  }

}
