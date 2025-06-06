import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HelpComponent } from './help';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize accordion functionality', () => {
    component.ngOnInit();
  });

  it('should have FAQ items', () => {
    const compiled = fixture.nativeElement;
    const faqItems = compiled.querySelectorAll('.accordion-item');
    expect(faqItems.length).toBeGreaterThan(0);
  });

  it('should toggle accordion item when clicked', () => {
    const compiled = fixture.nativeElement;
    const firstHeader = compiled.querySelector('.accordion-header');
    
    // Initially closed
    expect(firstHeader.classList.contains('active')).toBeFalse();
    
    // Click to open
    firstHeader.click();
    fixture.detectChanges();
    expect(firstHeader.classList.contains('active')).toBeTrue();
    
    // Click to close
    firstHeader.click();
    fixture.detectChanges();
    expect(firstHeader.classList.contains('active')).toBeFalse();
  });
});