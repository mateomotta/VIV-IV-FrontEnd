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

this.perfilForm.get('senha')?.disable();
this.perfilForm.get('email')?.disable();
  }

  originalData = {
  nome: 'Nome Teste Mockup',
  email: 'EmailTeste@gmail.com',
  senha: '********'
};

editandoSenha = false;
editandoEmail = false;

ngOnInit() {
  this.perfilForm.patchValue(this.originalData);
}

abrirAlterarSenha() {
  this.editandoSenha = true;
  this.perfilForm.get('senha')?.enable();
}

abrirAlterarEmail() {
  this.editandoEmail = true;
  this.perfilForm.get('email')?.enable();
}

salvarPerfil() {
  if (this.perfilForm.valid) {
    this.originalData = this.perfilForm.value;
    alert('Perfil salvo!');
    this.editandoEmail = false;
    this.editandoSenha = false;
    this.perfilForm.get('email')?.disable();
    this.perfilForm.get('senha')?.disable();
  }
}

descartar() {
  this.perfilForm.patchValue(this.originalData);
  this.editandoEmail = false;
  this.editandoSenha = false;
  this.perfilForm.get('email')?.disable();
  this.perfilForm.get('senha')?.disable();
}
alterarFoto() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.onchange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  fileInput.click();
}
}