import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  constructor(private router: Router) {} // Inyecta el Router

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
