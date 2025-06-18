import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display total users in stats', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Total de Usuários');
  });

  it('should approve an item', () => {
    const initialLength = component.pendingItems.length;
    component.approveItem(1);
    expect(component.pendingItems.length).toBe(initialLength - 1);
  });

  it('should block a user', () => {
    component.blockUser(1);
    const user = component.users.find(u => u.id === 1);
    expect(user?.status).toBe('Bloqueado');
  });
});
