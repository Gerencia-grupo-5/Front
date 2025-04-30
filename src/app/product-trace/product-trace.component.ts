import { Component } from '@angular/core';
import { QrScannerComponent } from '../qr-scanner/qr-scanner.component';

@Component({
  selector: 'app-product-trace',
  imports: [QrScannerComponent],
  standalone: true,
  templateUrl: './product-trace.component.html',
  styleUrl: './product-trace.component.css'
  
})
export class ProductTraceComponent {

}
