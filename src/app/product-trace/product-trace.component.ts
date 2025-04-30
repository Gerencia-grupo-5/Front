import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { QrScannerComponent } from '../qr-scanner/qr-scanner.component';

@Component({
  selector: 'app-product-trace',
  standalone: true,
  imports: [CommonModule, QrScannerComponent],
  templateUrl: './product-trace.component.html',
  styleUrls: ['./product-trace.component.css']
})
export class ProductTraceComponent implements AfterViewInit, OnDestroy {
  showScanner = false;
  showMap = false;
  scannedCode: string | null = null;

  @ViewChild('mapContainer', { static: false })
  mapContainer!: ElementRef<HTMLDivElement>;
  private map: any;  // Leaflet.Map, pero lo dejamos any por la import dinámica

  private ingredients: { name: string; coords: [number, number] }[] = [
    { name: 'Tomate', coords: [4.7110, -74.0721] },
    { name: 'Maíz',   coords: [6.2442, -75.5812] },
    { name: 'Café',   coords: [3.4516, -76.5310] }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleScanner() {
    this.showScanner = !this.showScanner;
    if (!this.showScanner) {
      this.showMap = false;
    }
  }

  onQrScanned(code: string) {
    this.scannedCode = code;
    this.showScanner = false;
    this.showMap = true;
    this.initMap();
  }

  ngAfterViewInit() {
    // Nada aquí; esperamos a initMap()
  }

  private async initMap() {
    // Solo en navegador
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Si ya existía, lo destruimos
    if (this.map) {
      this.map.remove();
    }

    // Import dinámico de Leaflet
    const L = await import('leaflet');

    // Inicializamos
    this.map = L.map(this.mapContainer.nativeElement).setView([4.5, -74.1], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Agregamos marcadores
    this.ingredients.forEach(item => {
      L.marker(item.coords)
       .addTo(this.map)
       .bindPopup(`<strong>${item.name}</strong>`);
    });
  }

  ngOnDestroy() {
    if (this.map && isPlatformBrowser(this.platformId)) {
      this.map.remove();
    }
  }
}
