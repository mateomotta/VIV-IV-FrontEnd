import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDoUsuario } from './area-do-usuario';

describe('AreaDoUsuario', () => {
  let component: AreaDoUsuario;
  let fixture: ComponentFixture<AreaDoUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaDoUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaDoUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
