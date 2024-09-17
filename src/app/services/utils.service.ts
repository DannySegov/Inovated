import { inject, Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  loadingCtrl = inject(LoadingController);

  loading() { // Método para mostrar un spinner de carga
    return this.loadingCtrl.create({ spinner: 'crescent'})
  }
}
