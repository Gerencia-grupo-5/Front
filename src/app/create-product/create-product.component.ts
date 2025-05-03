import { Component } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Product {
  nombre: string;
  descripcion: string;
  ingredientes: string[]; // ids
  empresa: string;
  vencimiento: string;
  precio: number;
  costo: number;
}

interface Ingredient {
  _id: string;
  name: string;
}
@Component({
  selector: 'app-create-product',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  product: Product = {
    nombre: '',
    descripcion: '',
    ingredientes: [],
    empresa: '',
    vencimiento: '',
    precio: 0,
    costo: 0
  };

  backendUrl = 'http://localhost:3000/productos';
  ingredientsUrl = 'http://localhost:3000/ingredients/all'; 
  ingredientsList: Ingredient[] = [];
  selectedIngredients: string[] = [];
  creationMessage: string = '';
  errorMessage: string = '';
  qrCodeUrl: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients() {
    this.http.get<{ ok: boolean; error: string; data: Ingredient[] }>(this.ingredientsUrl)
      .subscribe({
        next: (response) => {
          if (response.ok && response.data) {
            this.ingredientsList = response.data;
          } else {
            console.error('Error al cargar ingredientes', response.error);
            this.errorMessage = 'Error al cargar la lista de ingredientes.';
          }
        },
        error: (error) => {
          console.error('Error al conectar con el servidor para obtener ingredientes', error);
          this.errorMessage = 'Error al cargar la lista de ingredientes.';
        }
      });
  }

  toggleIngredient(ingredientId: string) {
    if (this.selectedIngredients.includes(ingredientId)) {
      this.selectedIngredients = this.selectedIngredients.filter(id => id !== ingredientId);
    } else {
      this.selectedIngredients.push(ingredientId);
    }
    this.product.ingredientes = this.selectedIngredients;
  }

  onSubmit() {
    this.http.post<{ ok: boolean; error: string; data: any }>(this.backendUrl, this.product)
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.creationMessage = 'Producto creado exitosamente.';
            this.errorMessage = '';
            this.resetForm();
            // Puedes redirigir al usuario a otra página si lo deseas
            // this.router.navigate(['/lista-productos']);
          } else {
            this.errorMessage = response.error;
            this.creationMessage = '';
          }
        },
        error: (error) => {
          this.errorMessage = 'Error al conectar con el servidor.';
          this.creationMessage = '';
          console.error('Error al crear producto', error);
        }
      });
  }
  resetForm() {
    this.product = {
      nombre: '',
      descripcion: '',
      ingredientes: [],
      empresa: '',
      vencimiento: '',
      precio: 0,
      costo: 0
    };
    this.selectedIngredients = [];
    this.qrCodeUrl = null; // Resetear la URL del código QR si la estás usando aquí
  }

  /*generateQRCode(data: string): string {
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=150x150`;
  }*/
}
