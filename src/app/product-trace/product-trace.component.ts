import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerComponent } from '../qr-scanner/qr-scanner.component';

@Component({
  selector: 'app-product-trace',
  standalone: true,
  imports: [CommonModule, QrScannerComponent],
  templateUrl: './product-trace.component.html',
  styleUrls: ['./product-trace.component.css']
})
export class ProductTraceComponent {
  showScanner = false;

  toggleScanner(): void {
    this.showScanner = !this.showScanner;
  }
}
