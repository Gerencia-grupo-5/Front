import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Ingredient {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  nombre: string;
  ingredientes: string[]; // Aquí solo estamos almacenando los IDs
  empresa: string;
  vencimiento: string;
  precio: number;
  costo: number;
}

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {
  productos: Product[] = [];
  ingredientes: Ingredient[] = []; // Lista de ingredientes
  errorMessage = '';
  backendUrlProductos = 'http://localhost:3000/productos/';
  backendUrlIngredientes = 'http://localhost:3000/ingredients/all';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Primero cargamos los productos
    this.http.get<Product[]>(this.backendUrlProductos)
      .subscribe({
        next: (response) => {
          this.productos = response;
          // Luego, cargamos los ingredientes una vez tengamos los productos
          this.loadIngredientes();
        },
        error: () => {
          this.errorMessage = 'No se pudo conectar con el servidor.';
        }
      });
  }

  loadIngredientes(): void {
    this.http.get<{ ok: boolean; data: Ingredient[] }>(this.backendUrlIngredientes)
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.ingredientes = response.data;
          } else {
            this.errorMessage = 'No se pudo cargar los ingredientes.';
          }
        },
        error: () => {
          this.errorMessage = 'No se pudo conectar con el servidor.';
        }
      });
  }

  // Método para obtener el nombre de un ingrediente dado su ID
  getIngredientName(ingredientId: string): string {
    const ingredient = this.ingredientes.find(i => i._id === ingredientId);
    return ingredient ? ingredient.name : 'Desconocido';
  }
}
