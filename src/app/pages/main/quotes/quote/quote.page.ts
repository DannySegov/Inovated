import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { QuotesService } from 'src/app/services/quotes.service';
import { Image } from 'src/app/shared/interfaces/quote';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.page.html',
  styleUrls: ['./quote.page.scss'],
})
export class QuotePage implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private quotesService = inject(QuotesService);
  private notificationService = inject(NotificationService);

  selectedQuote: any;
  selectedFiles: any[] = [];
  selectedImage!: string; 
  addedQuotes: any[] = [];
  base64: any;

  public Servicio: string = '';
  public Clave: string = '';
  public Categoria: string = '';
  public Fecha: string = '';
  public Hora: string = '';
  public Descripcion: string = '';
  public FechaLevantamiento: string = '';
  public HoraLevantamiento: string = '';
  public InfoLevantamiento: string = '';
  public ObservacionesAdic: string = '';

  public quoteForm: FormGroup = this.fb.group({
    folioCotizacion: ['', Validators.required],
    horaInstalacion: [0, Validators.required],
    imagenes: [[] as Image[]], // Añadir campo para las imágenes
  });

  constructor() { }

  ngOnInit() {
    this.getQuoteById();
  }

  getQuoteById()  {
    this.quotesService.currentData.subscribe(data => {
      this.selectedQuote = data;
      console.log('cotiza',this.selectedQuote);  
      if (this.selectedQuote && this.selectedQuote) {
        this.Servicio = this.selectedQuote.infoServicio.nombreServicio;
        this.Clave = this.selectedQuote.infoServicio.claveServicio;
        this.Categoria = this.selectedQuote.infoServicio.categoria;
        this.Descripcion = this.selectedQuote.infoServicio.descripcion;
        this.FechaLevantamiento = this.selectedQuote.levantamiento.fechaInstalacion;
        this.HoraLevantamiento = this.selectedQuote.levantamiento.horaInstalacion;
        this.InfoLevantamiento = this.selectedQuote.levantamiento.resumenLevantamiento;
        this.ObservacionesAdic = this.selectedQuote.levantamiento.observaciones
      }
    })
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.selectedFiles = []; // Asegurarse de limpiar la lista de archivos seleccionados
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.selectedFiles.push({ name: file.name, url: e.target.result, imagenID: null, imagen: e.target.result });
            if (i === 0) { // Si es el primer archivo, asignar a base64
                this.base64 = e.target.result;
            }
            // Actualizar el formulario con las imágenes después de leer cada archivo
            this.quoteForm.patchValue({ imagenes: this.selectedFiles.map(({ imagenID, imagen }) => ({ imagenID, imagen })) });
        };
        reader.readAsDataURL(file);
    }
  }

  addFileQuote() {
    this.addedQuotes.push(...this.selectedFiles);
    this.selectedFiles = [];
  }

  addQuote() {
    const quoteData = this.quoteForm.value;
    const levantamientoID = this.selectedQuote.levantamiento.levantamientoID;
    this.quotesService.addQuote(levantamientoID, quoteData).subscribe(response => {
      console.log('Cotización agregada:', response);
      if (response) {
        this.notificationService.presentToast(response.mensaje, 'top', 'success');
        this.router.navigate(['/main/quotes']);
      } else {
        this.notificationService.presentToast('Ocurrió un error al agregar la cotización.', 'top', 'danger');
      }
    });
  }
  
  openFileModal(fileUrl: string) {
    console.log('File URL:', fileUrl); // Agrega esto para verificar que el método se llama correctamente
    // Lógica para abrir el modal con el archivo
  }

  deleteFile(file: any) {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    this.addedQuotes = this.addedQuotes.filter(f => f !== file);
  }
}