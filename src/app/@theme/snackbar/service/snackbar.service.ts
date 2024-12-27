import {Injectable, signal} from '@angular/core';
import {SnackbarConfig} from '../interface/snackbar-config';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor() { }

  public snackbars = signal<{id: string; config: SnackbarConfig}[]>([]);

  show(config: SnackbarConfig) {
    const id = crypto.randomUUID();
    const defaultConfig: SnackbarConfig = {
      duration: 5000,
      position: 'bottom-right',
      type: 'info',
      animation: 'slide',
      animationDuration: 300,
      showProgress: true,
      showIcon: true,
      pauseOnHover: true,
      dismissible: true,
      rtl: false,
      width: 'auto',
      ...config
    };

    this.snackbars.update(bars => [...bars, { id, config: defaultConfig }]);
    return id;
  }

  close(id: string) {
    this.snackbars.update(bars => bars.filter(bar => bar.id !== id));
  }

  closeAll() {
    this.snackbars.set([]);
  }

}
