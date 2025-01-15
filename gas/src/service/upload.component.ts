import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../services/upload.service';
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
  loading = false;

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private messageService: MessageService
  ) {
    this.uploadForm = this.fb.group({
      date: ['', Validators.required]
    });
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (!this.uploadForm.valid || !this.selectedFile) {
      return;
    }

    this.loading = true;

    const date = this.uploadForm.get('date')?.value;
    const file = this.selectedFile;

    this.uploadService.uploadFile(date, file).subscribe({
      next: () => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Arquivo enviado com sucesso!' });
        this.uploadForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: err.message });
      }
    });
  }
}
