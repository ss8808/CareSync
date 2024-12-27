import {Component, inject, Inject, Input, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgIf, NgStyle, TitleCasePipe} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';
import {SpinnerService} from './service/spinner.service';

@Component({
  selector: 'app-spinner',
  imports: [
    NgStyle,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './spinner.component.html',
  standalone: true,
  styleUrl: './spinner.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.4s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.4s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ],
})
export class SpinnerComponent implements OnInit, OnDestroy{
  @Input() size: number = 120;
  @Input() text: string = 'Loading Appointment';
  @Input() textColor: string = '#2ac6b5';
  @Input() textSize: number = 1.1;

  responsiveSize: number | undefined;
  private resizeHandler: (() => void) | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  isLoading = false;

  spinnerService: SpinnerService = inject(SpinnerService);

  ngOnInit() {

    this.spinnerService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });

    // Only run browser-specific code if on browser
    if (isPlatformBrowser(this.platformId)) {
      this.responsiveSize = this.calculateResponsiveSize();
      // Use Arrow function to preserve 'this' context
      const handler = () => {
        this.responsiveSize = this.calculateResponsiveSize();
      };

      // Safe window access
      window.addEventListener('resize', handler);
      this.resizeHandler = handler;
    } else {
      // Fallback for server-side rendering
      this.responsiveSize = this.size;
    }
  }

  calculateResponsiveSize(): number {
    // Safely check window only when in browser
    if (isPlatformBrowser(this.platformId)) {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 375) {
        return Math.min(this.size * 0.7, 80);
      } else if (screenWidth <= 600) {
        return Math.min(this.size * 0.85, 100);
      }
    }
    return this.size;
  }

  ngOnDestroy() {
    // Safely remove event listener
    if (isPlatformBrowser(this.platformId) && this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

}
