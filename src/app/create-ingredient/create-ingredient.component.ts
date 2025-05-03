import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Ingredient {
  name: string;
  provider: string;
  latitude: number;
  longitude: number;
  country: string;
  origin: string; 
  certification: string; 
}

@Component({
  selector: 'app-create-ingredient',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.css']
})
export class CreateIngredientComponent {
  ingredient: Ingredient = {
    name: '',
    provider: '',
    latitude: 0,
    longitude: 0,
    country: '',
    origin: '',
    certification: ''
  };

  backendUrl = 'http://localhost:3000/ingredients';
  creationMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post<{ ok: boolean; error: string; data: string }>(this.backendUrl, this.ingredient)
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.creationMessage = `Ingrediente creado con ID: ${response.data}`;
            this.errorMessage = '';
            this.resetForm();
          } else {
            this.errorMessage = response.error;
            this.creationMessage = '';
          }
        },
        error: (error) => {
          this.errorMessage = 'Error al conectar con el servidor.';
          this.creationMessage = '';
          console.error('Error al crear ingrediente', error);
        }
      });
  }
  resetForm() {
    this.ingredient = {
      name: '',
      provider: '',
      latitude: 0,
      longitude: 0,
      country: '',
      origin: '',
      certification: ''
    };
  }
}
