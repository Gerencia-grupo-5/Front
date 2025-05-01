import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private router: Router) {}
  contact = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    // back
    console.log('Formulario enviado', this.contact);
  }
  goToListaProductos() {
    this.router.navigate(['/lista-productos']);
  }

  goToListaIngredientes() {
    this.router.navigate(['/lista-ingredientes']);
  }

  goToScan() {
    this.router.navigate(['/product-trace']);
  }
}

