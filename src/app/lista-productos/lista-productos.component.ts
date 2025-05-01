import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-lista-productos',
  imports: [CommonModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {
  productos = [
    { nombre: 'Croquetas para perro adulto', categoria: 'Perro', precio: 25000 },
    { nombre: 'Pate de pollo para gato', categoria: 'Gato', precio: 12000 },
    { nombre: 'Snack dental para perro', categoria: 'Perro', precio: 8000 },
    { nombre: 'Alimento seco premium gato', categoria: 'Gato', precio: 30000 },
  ];
}
