import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class PerfilComponent {
  perfilForm: FormGroup;
  fotoUrl: string | null = null;

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  salvarPerfil() {
    // Salvar lógica
  }

  descartar() {
    // Descartar alterações
  }

  alterarFoto() {
    // Lógica para alterar foto
  }

  abrirAlterarSenha() {
    // Lógica para alterar senha
  }

  abrirAlterarEmail() {
    // Lógica para alterar email
  }
}