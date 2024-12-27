import {Component, computed, effect, inject} from '@angular/core';
import {Subscription} from 'rxjs';
import {SnackbarConfig} from './interface/snackbar-config';
import {SnackbarService} from './service/snackbar.service';

@Component({
  selector: 'app-snackbar',
  imports: [],
  templateUrl: './snackbar.component.html',
  standalone: true,
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  private snackbarService = inject(SnackbarService);

  activeSnackbars = computed(() => this.snackbarService.snackbars());
  private timeouts = new Map<string, any>();

  constructor() {
    effect(() => {
      this.activeSnackbars().forEach(snackbar => {
        if (!this.timeouts.has(snackbar.id)) {
          this.startTimer(snackbar);
        }
      });
    });
  }

  private startTimer(snackbar: {id: string; config: SnackbarConfig}) {
    if (snackbar.config.duration) {
      const timeout = setTimeout(() => {
        this.close(snackbar.id);
      }, snackbar.config.duration);

      this.timeouts.set(snackbar.id, timeout);
    }
  }

  handleMouseEnter(snackbar: {id: string; config: SnackbarConfig}) {
    if (snackbar.config.pauseOnHover) {
      clearTimeout(this.timeouts.get(snackbar.id));
    }
  }

  handleMouseLeave(snackbar: {id: string; config: SnackbarConfig}) {
    if (snackbar.config.pauseOnHover) {
      this.startTimer(snackbar);
    }
  }

  handleClick(snackbar: {id: string; config: SnackbarConfig}) {
    snackbar.config.onClick?.();
  }

  handleAction(snackbar: {id: string; config: SnackbarConfig}) {
    snackbar.config.action?.callback();
    this.close(snackbar.id);
  }

  close(id: string) {
    clearTimeout(this.timeouts.get(id));
    this.timeouts.delete(id);
    this.snackbarService.close(id);
  }

  getContainerClasses(config: SnackbarConfig): string {
    return `snackbar-container
      type-${config.type}
      position-${config.position}
      ${config.customClass || ''}`.trim();
  }

  // Inside SnackbarComponent class
  getIconClass(config: SnackbarConfig): string {
    const baseClass = 'snackbar-icon';

    const typeClasses = {
      success: 'icon-success',
      error: 'icon-error',
      warning: 'icon-warning',
      info: 'icon-info',
      custom: 'icon-custom'
    };

    return `${baseClass} ${typeClasses[config.type || 'info']}`;
  }

  getDefaultIcon(config: SnackbarConfig): string {
    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-times-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle',
      custom: 'fas fa-bell'
    };
    return icons[config.type || 'info'];
  }
}
