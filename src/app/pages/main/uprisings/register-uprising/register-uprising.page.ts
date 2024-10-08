import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    resumen: ['', Validators.required],
    
    observaciones: ['', Validators.required],
  });

  public selectedServicio: string = '';
  public selectedClave: string = '';
  public selectedCategoria: string = '';
  public selectedFecha: string = '';
  public selectedHora: string = '';
  public selectedDescripcion: string = '';

  timeValue!: Date;
  hour: number = 12;
  formattedHour: string = '12';
  minute: number = 0;
  formattedMinute: string = '00';
  amPm: string = 'AM';
  selectedFiles: any[] = [];

  constructor() { 
    this.timeValue = new Date();
  }

  ngOnInit() {
    this.getUprisingById();
  }

  getUprisingById() {
    this.uprisingsService.currentData.subscribe(data => {
        this.selectedUprising = data;
        if (this.selectedUprising && this.selectedUprising.infoServicio) {
            this.selectedServicio = this.selectedUprising.infoServicio.nombreServicio || '';
            this.selectedClave = this.selectedUprising.infoServicio.claveServicio || '';
            this.selectedCategoria = this.selectedUprising.infoServicio.categoria || '';
            this.selectedFecha = this.selectedUprising.fecha || '';
            this.selectedHora = this.selectedUprising.hora || '';
            this.selectedDescripcion = this.selectedUprising.descripcion || '';
        } else {
            console.error('Estructura de datos inesperada:', this.selectedUprising);
        }
    });
  }

  onDateChange(event: any) {
    const selectedDate = new Date(event.detail.value);
    selectedDate.setMinutes(selectedDate.getMinutes() + selectedDate.getTimezoneOffset());
    const formattedDate = formatDate(selectedDate, 'yyyy-MM-dd', 'en-US');
    this.registerUprisingForm.patchValue({ fecha: formattedDate });
    this.selectedDate = formattedDate;
    this.dateModal.dismiss();
  }

  onTimeChange(event: any) {
    const dateValue = event.detail.value;
    if (dateValue) {
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
            const formattedTime = this.formatTime(date);
            this.registerUprisingForm.patchValue({ hora: formattedTime });
            this.selectedTime = this.formatDisplayTime(date.getHours(), date.getMinutes());
        } else {
            console.error('Fecha inválida:', this.selectedTime);
        }
    } else {
        console.error('Valor de evento inválido:', event);
    }
  }

  saveTime() {
    const date = new Date();
    date.setHours(this.hour, this.minute, 0, 0);
    const formattedTime = this.formatTime(date);
    this.registerUprisingForm.patchValue({ hora: formattedTime });
    this.selectedTime = this.formatDisplayTime(this.hour, this.minute);
    this.timeModal.dismiss();
  }

  incrementHour() {
    this.hour = this.hour < 12 ? this.hour + 1 : 1;
    this.formattedHour = this.formatHour(this.hour);
    this.updateSelectedTime();
  }

  decrementHour() {
    this.hour = this.hour > 1 ? this.hour - 1 : 12;
    this.formattedHour = this.formatHour(this.hour);
    this.updateSelectedTime();
  }

  incrementMinute() {
    this.minute = this.minute < 59 ? this.minute + 1 : 0;
    this.formattedMinute = this.formatMinute(this.minute);
    this.updateSelectedTime();
  }

  decrementMinute() {
    this.minute = this.minute > 0 ? this.minute - 1 : 59;
    this.formattedMinute = this.formatMinute(this.minute);
    this.updateSelectedTime();
  }

  toggleAmPm() {
    this.amPm = this.amPm === 'AM' ? 'PM' : 'AM';
    this.updateSelectedTime();
  }

  validateHour() {
    let hour = parseInt(this.formattedHour, 10);
    if (isNaN(hour) || hour < 1 || hour > 12) hour = 12;
    this.hour = hour;
    this.formattedHour = this.formatHour(this.hour);
    this.updateSelectedTime();
  }

  validateMinute() {
    let minute = parseInt(this.formattedMinute, 10);
    if (isNaN(minute) || minute < 0 || minute > 59) minute = 0;
    this.minute = minute;
    this.formattedMinute = this.formatMinute(this.minute);
    this.updateSelectedTime();
  }

  updateSelectedTime() {
    let hours = this.hour;
    if (this.amPm === 'PM' && this.hour !== 12) hours += 12;
    else if (this.amPm === 'AM' && this.hour === 12) hours = 0;
    const date = new Date();
    date.setHours(hours, this.minute, 0, 0);
    const formattedTime = this.formatTime(date);
    this.selectedTime = this.formatDisplayTime(this.hour, this.minute);
    this.registerUprisingForm.patchValue({ hora: formattedTime });
  }

  formatHour(hour: number): string {
    return hour < 10 ? '0' + hour : hour.toString();
  }

  formatMinute(minute: number): string {
    return minute < 10 ? '0' + minute : minute.toString();
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
    return `${formattedHour}:${formattedMinute} ${this.amPm}`;
  }

  updateTime() {
    let hour24 = parseInt(this.formattedHour, 10);
    if (this.amPm === 'PM' && hour24 < 12) hour24 += 12;
    else if (this.amPm === 'AM' && hour24 === 12) hour24 = 0;
    this.registerUprisingForm.patchValue({ hora: `${hour24}:${this.formattedMinute}:00.000` });
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFiles.push({ name: file.name, url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  deleteFile(fileToDelete: { name: string, url: string }) {
    const initialLength = this.selectedFiles.length;
    this.selectedFiles = this.selectedFiles.filter(file => file !== fileToDelete);
    if (this.selectedFiles.length < initialLength) {
      this.notificationService.presentToast(`La imagen ${fileToDelete.name} ha sido eliminada.`, 'top', 'success');
    }
  }

  openImageModal(imageUrl: string) {
    this.selectedImage = imageUrl; 
  }

  sendUprising() {
    // Implementar lógica para enviar levantamiento
  }
}