import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-ingredient',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.css']
})
export class CreateIngredientComponent {
  ingredient = {
    name: '',
    origin: '',
    certification: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log('Ingredient created:', this.ingredient);

    // Optional: POST to backend
    // this.http.post('http://localhost:3000/api/ingredients', this.ingredient).subscribe();
  }
}
