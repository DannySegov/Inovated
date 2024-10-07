import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UprisingsService } from 'src/app/services/uprisings.service';
import { formatDate } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register-uprising',
  templateUrl: './register-uprising.page.html',
  styleUrls: ['./register-uprising.page.scss'],
})
export class RegisterUprisingPage implements OnInit {

  @ViewChild('dateModal') dateModal: any;
  @ViewChild('timeModal') timeModal: any;

  private fb = inject(FormBuilder);
  private uprisingsService = inject(UprisingsService);
  private notificationService = inject(NotificationService);
  selectedUprising: any;
  selectedImage!: string; 

  public selectedDate: string = 'dd / mm / aaaa';
  public selectedTime: string = '12:00 pm'; 

  public registerUprisingForm: FormGroup = this.fb.group({
    servicio: [{ value: '', disabled: true }],
    clave: [{ value: '', disabled: true }],
    categoria: [{ value: '', disabled: true }],
    fecha: [{ value: '', disabled: false }],
    hora: [{ value: '', disabled: false }],
    descripcion: [{ value: '', disabled: true }]
  });

  timeValue!: Date;

  constructor() { 
    this.timeValue = new Date();
  }

  ngOnInit() {
    this.getUprisingById();
  }

  // Método para obtener los levantamientos por ID
  getUprisingById() {
    this.uprisingsService.currentData.subscribe(data => {
        this.selectedUprising = data;
        console.log('Datos recibidos en otro componente:', this.selectedUprising);

        // Verificar que los datos no estén vacíos y que tengan infoServicio
        if (this.selectedUprising && this.selectedUprising.infoServicio) {
            this.registerUprisingForm.patchValue({
                servicio: this.selectedUprising.infoServicio.nombreServicio || '',
                clave: this.selectedUprising.infoServicio.claveServicio || '',
                categoria: this.selectedUprising.infoServicio.categoria || '',
                fecha: this.selectedUprising.fecha || '',
                hora: this.selectedUprising.hora || '',
                descripcion: this.selectedUprising.descripcion || ''
            });
        } else {
            console.error('Estructura de datos inesperada:', this.selectedUprising);
        }
    });
  }

  onDateChange(event: any) { // Método para cambiar la fecha
    const selectedDate = new Date(event.detail.value);
    const formattedDate = formatDate(selectedDate, 'yyyy-MM-dd', 'en-US');
    this.registerUprisingForm.patchValue({ fecha: formattedDate });
    this.selectedDate = formattedDate;
    this.dateModal.dismiss();
  }

  onTimeChange(event: any) { // Método para cambiar la hora
    const dateValue = event.detail.value;
    if (dateValue) {
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
            
            this.registerUprisingForm.patchValue({ hora: formattedTime });
            this.selectedTime = this.formatDisplayTime(date.getHours(), date.getMinutes());
        } else {
            console.error('Fecha inválida:', this.selectedTime);
        }
    } else {
        console.error('Valor de evento inválido:', event);
    }
  }

  saveTime() { // Método para guardar la hora seleccionada
    const date = new Date();
    date.setHours(this.hour, this.minute, 0, 0);
    const formattedTime = this.formatTime(date);
    this.registerUprisingForm.patchValue({ hora: formattedTime });
    this.selectedTime = this.formatDisplayTime(this.hour, this.minute);
    this.timeModal.dismiss();
  }

  hour: number = 12;
  formattedHour: string = '12';
  minute: number = 0;
  formattedMinute: string = '00';
  amPm: string = 'AM';

  incrementHour() {
    if (this.hour < 12) {
      this.hour++;
    } else {
      this.hour = 1;
    }
    this.formattedHour = this.formatHour(this.hour);
    this.updateSelectedTime();
  }

  decrementHour() {
    if (this.hour > 1) {
      this.hour--;
    } else {
      this.hour = 12;
    }
    this.formattedHour = this.formatHour(this.hour);
    this.updateSelectedTime();
  }

  incrementMinute() {
    if (this.minute < 59) {
      this.minute++;
    } else {
      this.minute = 0;
    }
    this.formattedMinute = this.formatMinute(this.minute);
    this.updateSelectedTime();
  }

  decrementMinute() {
    if (this.minute > 0) {
      this.minute--;
    } else {
      this.minute = 59;
    }
    this.formattedMinute = this.formatMinute(this.minute);
    this.updateSelectedTime();
  }

  toggleAmPm() {
    this.amPm = this.amPm === 'AM' ? 'PM' : 'AM';
    this.updateSelectedTime();
  }

  formatHour(hour: number): string {
    return hour < 10 ? '0' + hour : hour.toString();
  }

  formatMinute(minute: number): string {
    return minute < 10 ? '0' + minute : minute.toString();
  }

  validateHour() {
    let hour = parseInt(this.formattedHour, 10);
    if (isNaN(hour) || hour < 1 || hour > 12) {
      hour = 12;
    }
    this.hour = hour;
    this.formattedHour = this.formatHour(this.hour);
    this.updateSelectedTime();
  }

  validateMinute() {
    let minute = parseInt(this.formattedMinute, 10);
    if (isNaN(minute) || minute < 0 || minute > 59) {
      minute = 0;
    }
    this.minute = minute;
    this.formattedMinute = this.formatMinute(this.minute);
    this.updateSelectedTime();
  }

  updateSelectedTime() {
    let hours = this.hour;
    if (this.amPm === 'PM' && this.hour !== 12) {
      hours += 12;
    } else if (this.amPm === 'AM' && this.hour === 12) {
      hours = 0;
    }
    const date = new Date();
    date.setHours(hours, this.minute, 0, 0);
    const formattedTime = this.formatTime(date);
    this.selectedTime = this.formatDisplayTime(this.hour, this.minute);
    this.registerUprisingForm.patchValue({ hora: formattedTime });
  }

  formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  formatDisplayTime(hour: number, minute: number): string {
    const formattedHour = hour < 10 ? '0' + hour : hour.toString();
    const formattedMinute = minute < 10 ? '0' + minute : minute.toString();
    const amPm = this.amPm;
    return `${formattedHour}:${formattedMinute} ${amPm}`;
  }

  updateTime() {
    const hour = this.formattedHour;
    const minute = this.formattedMinute;
    const amPm = this.amPm;

    // Convierte la hora y minuto a formato de 24 horas si es necesario
    let hour24 = parseInt(hour, 10);
    if (amPm === 'PM' && hour24 < 12) {
      hour24 += 12;
    } else if (amPm === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    this.registerUprisingForm.patchValue({
      hora: `${hour24}:${minute}:00.000`
    });
  }

  selectedFiles: any[] = [];

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFiles.push({
          name: file.name,
          url: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  // Función para eliminar imagenes cargadas
  deleteFile(fileToDelete: { name: string, url: string }) {
    const initialLength = this.selectedFiles.length;
    this.selectedFiles = this.selectedFiles.filter(file => file !== fileToDelete);
    if (this.selectedFiles.length < initialLength) {
      this.notificationService.presentToast(`La imagen ${fileToDelete.name} ha sido eliminada.`, 'top','success');
    }
  }

  openImageModal(imageUrl: string) {
    this.selectedImage = imageUrl; 
  }
}