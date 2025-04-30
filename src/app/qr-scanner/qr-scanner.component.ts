import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule } from '@angular/common';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'qr-scanner',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent {
  scannedCode: string | null = null;
  hasDevices = false;
  hasPermission = false;
  availableDevices: MediaDeviceInfo[] = [];

  // Aquí la corrección: usamos el enum en vez de string
  formats: BarcodeFormat[] = [ BarcodeFormat.QR_CODE ];

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.hasDevices = !!devices.length;
    this.availableDevices = devices;
  }

  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  onScanSuccess(result: string): void {
    this.scannedCode = result;
    console.log('QR leído:', result);
  }

  onScanError(error: any): void {
    console.error('Error escaneando:', error);
  }
}
