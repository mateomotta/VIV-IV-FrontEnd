import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('name field validity', () => {
    const name = component.contactForm.controls['name'];
    expect(name.valid).toBeFalsy();

    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();

    name.setValue('A');
    expect(name.hasError('minlength')).toBeTruthy();

    name.setValue('Valid Name');
    expect(name.valid).toBeTruthy();
  });

  it('email field validity', () => {
    const email = component.contactForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();

    email.setValue('invalid-email');
    expect(email.hasError('email')).toBeTruthy();

    email.setValue('valid@email.com');
    expect(email.valid).toBeTruthy();
  });

  it('message field validity', () => {
    const message = component.contactForm.controls['message'];
    expect(message.valid).toBeFalsy();

    message.setValue('');
    expect(message.hasError('required')).toBeTruthy();

    message.setValue('Short');
    expect(message.hasError('minlength')).toBeTruthy();

    message.setValue('This is a valid message with enough length');
    expect(message.valid).toBeTruthy();
  });

  it('should call onSubmit method', () => {
    spyOn(component, 'onSubmit');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should not submit if form is invalid', () => {
    component.onSubmit();
    expect(component.isSubmitting).toBeFalse();
  });

  it('should submit if form is valid', () => {
    component.contactForm.controls['name'].setValue('Test Name');
    component.contactForm.controls['email'].setValue('test@test.com');
    component.contactForm.controls['message'].setValue('This is a test message');
    
    component.onSubmit();
    expect(component.isSubmitting).toBeTrue();
  });
});
