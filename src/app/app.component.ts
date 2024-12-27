import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {filter} from 'rxjs';
import {environment} from '../environment/environment';
import {SpinnerComponent} from './@theme/spinner/spinner.component';
import {SpinnerService} from './@theme/spinner/service/spinner.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'CareSync';
  baseTitle = 'Doctor Appointment System';

  router: Router = inject(Router);
  titleService: Title = inject(Title);

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let activeRoute = this.router.routerState.root;

        while (activeRoute.firstChild) {
          activeRoute = activeRoute.firstChild;
        }

        const routeTitle = activeRoute.snapshot.data['title'];
        const title = routeTitle ?
          `${this.baseTitle} - ${routeTitle} ${environment.productSlogan}` :
          `${this.baseTitle} ${environment.productSlogan}`;

        this.titleService.setTitle(title);
      });

  }
}
