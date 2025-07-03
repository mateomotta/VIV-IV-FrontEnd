import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a hero section', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.hero-section')).toBeTruthy();
  });

  it('should have quick links section', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.quick-links-section')).toBeTruthy();
    expect(compiled.querySelectorAll('.quick-link-card').length).toBe(3);
  });

  it('should have featured content section', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.featured-section')).toBeTruthy();
    expect(compiled.querySelectorAll('.featured-card').length).toBe(2);
  });

  it('should call navigateToRegister when primary button is clicked', () => {
    spyOn(component, 'navigateToRegister');
    const button = fixture.nativeElement.querySelector('.primary-button');
    button.click();
    expect(component.navigateToRegister).toHaveBeenCalled();
  });
});