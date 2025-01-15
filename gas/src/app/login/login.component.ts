import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card'; // Importação do PrimeNG Card
import { ButtonModule } from 'primeng/button'; // Para botões
import { InputTextModule } from 'primeng/inputtext'; // Para input
import { ReactiveFormsModule } from '@angular/forms'; // Para [formGroup]
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.loading = false;
        // Supondo que o token seja retornado no campo "token"
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/dashboard']); // Redirecionar para o dashboard
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error.error.message || 'Login falhou. Tente novamente.';
      },
    });
  }
}
