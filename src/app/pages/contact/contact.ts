import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
  }

  get formControls() {
    return this.contactForm.controls;
  }

onSubmit(): void {
  if (this.contactForm.invalid) {
    this.markFormGroupTouched(this.contactForm);
    return;
  }

  this.isSubmitting = true;
  
  // Simulate API call
  setTimeout(() => {
    this.isSubmitting = false;
    this.submitSuccess = true;
    this.contactForm.reset();
    
    // Mostrar modal
    this.showConfirmationModal();
    
    // Esconder modal após 3 segundos
    setTimeout(() => {
      this.hideConfirmationModal();
    }, 3000);
  }, 1500);
}

showConfirmationModal() {
  const modal = document.getElementById('confirmationModal');
  if (modal) {
    modal.classList.add('active');
  }
}

hideConfirmationModal() {
  const modal = document.getElementById('confirmationModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}