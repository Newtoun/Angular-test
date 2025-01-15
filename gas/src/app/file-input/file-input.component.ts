import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [MessageService]
})
export class UploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.uploadForm = this.fb.group({
      date: ['', Validators.required]
    });
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) { // Limite de 5MB
        this.fileError = 'O arquivo deve ter no máximo 5MB.';
        this.selectedFile = null;
      } else {
        this.fileError = null;
        this.selectedFile = file;
      }
    }
  }

  onSubmit() {
    if (!this.uploadForm.valid || !this.selectedFile) {
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('date', this.uploadForm.get('date')?.value);
    formData.append('file', this.selectedFile);

    this.http.post('https://api.exemplo.com/upload', formData).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Arquivo enviado com sucesso!' });
        this.uploadForm.reset();
        this.selectedFile = null;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha no envio do arquivo.' });
      }
    });
  }
}
