import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './lista-perfil.html',
  styleUrls: ['./lista-perfil.css']
})
export class ListaPerfilComponent {
  perfis = [
    { nome: 'Startup 1', descricao: 'Inovando no setor de saúde', imagem: 'assets/images/startup1.jpg', tipo: 'startup', area: 'tecnologia' },
    { nome: 'Empresa 2', descricao: 'Líder em soluções industriais', imagem: 'assets/images/empresa2.jpg', tipo: 'empresa', area: 'tecnologia' },
    { nome: 'Universidade X', descricao: 'Referência em educação', imagem: 'assets/images/universidade.jpg', tipo: 'universidade', area: 'educacao' },
    { nome: 'Startup 3', descricao: 'Transformando a mobilidade urbana', imagem: 'assets/images/startup3.jpg', tipo: 'startup', area: 'tecnologia' },
    { nome: 'Instituto Y', descricao: 'Centro de pesquisa avançada', imagem: 'assets/images/instituto.jpg', tipo: 'universidade', area: 'educacao' },
    { nome: 'Joinvalle', descricao: 'Inovando e Empreendendo', imagem: '', tipo: 'startup', area: 'tecnologia' },
    { nome: 'Tecfor', descricao: 'Líder em soluções industriais', imagem: '', tipo: 'empresa', area: 'tecnologia' },
    { nome: 'Universidade Univille', descricao: 'Referência em educação', imagem: '', tipo: 'universidade', area: 'educacao' },
    { nome: 'PowerHub', descricao: 'Monitorando o uso da Rede Elétrica', imagem: '', tipo: 'startup', area: 'tecnologia' },
    { nome: 'UniSociesc', descricao: 'Centro de pesquisa avançada', imagem: '', tipo: 'universidade', area: 'educacao' }
  ];

  filtro = {
    tipo: '',
    palavraChave: '',
    area: ''
  };

  perfisFiltrados = [...this.perfis];
  pagina = 1;
  itensPorPagina = 3;
  temMaisPerfis = true;

  constructor() {
    this.aplicarPaginacao();
  }

  filtrarPerfis() {
    const termo = this.filtro.palavraChave.toLowerCase();

    this.perfisFiltrados = this.perfis.filter(p => {
      const nomeMatch = p.nome.toLowerCase().includes(termo);
      const tipoMatch = this.filtro.tipo ? p.tipo === this.filtro.tipo : true;
      const areaMatch = this.filtro.area ? p.area === this.filtro.area : true;
      return nomeMatch && tipoMatch && areaMatch;
    });

    this.pagina = 1;
    this.temMaisPerfis = true;
    this.aplicarPaginacao();
  }

  aplicarPaginacao() {
    const fim = this.pagina * this.itensPorPagina;
    const inicio = 0;
    const todosPerfisFiltrados = this.perfis.filter(p => {
      const nomeMatch = p.nome.toLowerCase().includes(this.filtro.palavraChave.toLowerCase());
      const tipoMatch = this.filtro.tipo ? p.tipo === this.filtro.tipo : true;
      const areaMatch = this.filtro.area ? p.area === this.filtro.area : true;
      return nomeMatch && tipoMatch && areaMatch;
    });
    this.perfisFiltrados = todosPerfisFiltrados.slice(inicio, fim);
    this.temMaisPerfis = fim < todosPerfisFiltrados.length;
  }

  carregarMais() {
    this.pagina++;
    this.aplicarPaginacao();
  }
}
