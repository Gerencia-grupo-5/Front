import { Component } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  product = {
    name: '',
    description: '',
    ingredients: '',
    category: 'Food',
    manufactureDate: ''
  };

  qrCodeUrl: string | null = null;

  constructor(private http: HttpClient) {}

  onSubmit() {
    const qrData = `${this.product.name} | ${this.product.description}`;
    this.qrCodeUrl = this.generateQRCode(qrData);

    // Optional: POST to backend
    // this.http.post('http://localhost:3000/api/products', this.product).subscribe();
  }

  generateQRCode(data: string): string {
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=150x150`;
  }
}
