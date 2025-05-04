import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-ingredientes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './lista-ingredientes.component.html',
  styleUrl: './lista-ingredientes.component.css'
})
export class ListaIngredientesComponent {
  ingredientes: any[] = [];
  errorMessage = '';
  backendUrl = 'http://localhost:3000/ingredients/all';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ ok: boolean; error: string; data: any[] }>(this.backendUrl)
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.ingredientes = response.data;
          } else {
            this.errorMessage = response.error;
          }
        },
        error: (error) => {
          console.error('Error al cargar ingredientes', error);
          this.errorMessage = 'No se pudo obtener la lista de ingredientes.';
        }
      });
  }
}
