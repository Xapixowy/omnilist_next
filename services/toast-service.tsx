import Toast, { ToastType } from '@/components/libraries/toast';
import toast, { ToastOptions } from 'react-hot-toast';

export class ToastService {
  static options: ToastOptions = {
    position: 'top-right',
    duration: 4000,
    removeDelay: 0,
  };

  public static success(title: string, message: string, options?: ToastOptions): void {
    this.toast(title, message, 'success', {
      duration: 2000,
      ...options,
    });
  }

  public static error(title: string, message: string, options?: ToastOptions): void {
    this.toast(title, message, 'error', options);
  }

  public static info(title: string, message: string, options?: ToastOptions): void {
    this.toast(title, message, 'info', options);
  }

  public static warning(title: string, message: string, options?: ToastOptions): void {
    this.toast(title, message, 'warning', options);
  }

  private static toast(title: string, message: string, type: ToastType, options: ToastOptions = {}): string {
    const toastOptions = { ...this.options, ...options };

    return toast.custom(
      ({ id, duration, dismissed }) => (
        <Toast id={id} title={title} message={message} type={type} dismissed={dismissed} duration={duration} />
      ),
      toastOptions,
    );
  }
}
