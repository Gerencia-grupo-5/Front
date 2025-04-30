// qr-scanner.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'qr-scanner',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent {
  @Output() qrCodeScanned = new EventEmitter<string>();

  formats: BarcodeFormat[] = [ BarcodeFormat.QR_CODE ];
  availableDevices: MediaDeviceInfo[] = [];
  hasPermission = false;
  hasDevices = false;

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.hasDevices = !!devices.length;
    this.availableDevices = devices;
  }
  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }
  onScanSuccess(result: string) {
    console.log('QR leído:', result);
    this.qrCodeScanned.emit(result);
  }
  onScanError(err: any) {
    console.error(err);
  }
}
