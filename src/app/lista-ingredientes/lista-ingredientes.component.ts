import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-lista-ingredientes',
  imports: [CommonModule],
  templateUrl: './lista-ingredientes.component.html',
  styleUrl: './lista-ingredientes.component.css'
})
export class ListaIngredientesComponent {
  ingredientes = [
    { nombre: 'Pollo deshidratado', usadoEn: 'Perro y Gato' },
    { nombre: 'Maíz amarillo', usadoEn: 'Perro' },
    { nombre: 'Harina de pescado', usadoEn: 'Gato' },
    { nombre: 'Aceite de salmón', usadoEn: 'Perro y Gato' },
  ];
}
