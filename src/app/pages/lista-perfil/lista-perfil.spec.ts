// lista-perfil.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ListaPerfilComponent } from './lista-perfil';

describe('ListaPerfilComponent', () => {
  let component: ListaPerfilComponent;
  let fixture: ComponentFixture<ListaPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPerfilComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve filtrar por palavra-chave', () => {
    component.filtro.palavraChave = '1';
    component.filtrarPerfis();
    expect(component.perfisFiltrados.every(p => p.nome.includes('1'))).toBeTrue();
  });

  it('deve filtrar por tipo', () => {
    component.filtro.tipo = 'startup';
    component.filtrarPerfis();
    expect(component.perfisFiltrados.every(p => p.tipo === 'startup')).toBeTrue();
  });

  it('deve filtrar por área', () => {
    component.filtro.area = 'tecnologia';
    component.filtrarPerfis();
    expect(component.perfisFiltrados.every(p => p.area === 'tecnologia')).toBeTrue();
  });

  it('deve carregar mais perfis', () => {
    const quantidadeAntes = component.perfisFiltrados.length;
    component.carregarMais();
    expect(component.perfisFiltrados.length).toBeGreaterThan(quantidadeAntes);
  });
});
