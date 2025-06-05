import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenha {
  esqueciSenhaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.esqueciSenhaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.esqueciSenhaForm.get('email');
  }

  enviarEmail() {
    if (this.esqueciSenhaForm.valid) {
      // lógica de envio de email
      alert('Email enviado!');
    }
  }
}