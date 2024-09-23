import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,  
    InputTextModule,      
    InputTextareaModule,  
    ButtonModule,         
    MessagesModule,
    MessageModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  messages = "test";

  constructor(private formBuilder: FormBuilder) {
    // Initialisation du formulaire
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],  // Email obligatoire et valide
      message: ['', [Validators.required, Validators.maxLength(300)]]  // Message obligatoire et max 300 caractères
    });
  }

  // Accesseurs pour les champs du formulaire avec l'opérateur de non-nullité !
  get email() {
    return this.contactForm.get('email')!;
  }

  get message() {
    return this.contactForm.get('message')!;
  }

  // Méthode pour envoyer le formulaire
  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      console.log('Formulaire envoyé', this.contactForm.value);

      // Réinitialiser le formulaire après l'envoi
      this.contactForm.reset();
    }
  }
}
