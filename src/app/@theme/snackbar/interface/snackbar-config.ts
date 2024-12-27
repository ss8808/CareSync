export interface SnackbarConfig {
  message: string;
  title?: string;
  duration?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  type?: 'success' | 'error' | 'warning' | 'info' | 'custom';
  animation?: 'fade' | 'slide' | 'bounce' | 'zoom' | 'flip';
  animationDuration?: number;
  showProgress?: boolean;
  showIcon?: boolean;
  customIcon?: string;
  customColor?: string;
  action?: {
    text: string;
    callback: () => void;
  };
  pauseOnHover?: boolean;
  dismissible?: boolean;
  rtl?: boolean;
  width?: string;
  customClass?: string;
  onClick?: () => void;
  onClose?: () => void;
}
