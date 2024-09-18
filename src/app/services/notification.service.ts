import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastController = inject(ToastController);

  constructor() { }

    // Método para mostrar un mensaje emergente
    public async presentToast(message: string, position: 'top' | 'middle' | 'bottom', color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark') {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        position: position,
        color: color,
        mode: 'ios'
      });
      await toast.present();
    }
}
