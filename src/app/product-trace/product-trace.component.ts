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

interface IngredientInfo {
  name: string;
  country: string;
  coords: [number, number];
}

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
  productName = '';
  ingredients: IngredientInfo[] = [];

  @ViewChild('mapContainer', { static: false })
  mapContainer!: ElementRef<HTMLDivElement>;
  private map: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleScanner() {
    this.showScanner = !this.showScanner;
    if (!this.showScanner) {
      this.showMap = false;
    }
  }

  onQrScanned(qrText: string) {
    // 1) parsear líneas
    const lines = qrText.split('\n').map(l => l.trim()).filter(l => l);
    // 2) extraer nombre
    const prodLine = lines.find(l => l.startsWith('🛒 Producto:'));
    this.productName = prodLine
      ? prodLine.replace('🛒 Producto:','').trim()
      : 'Producto desconocido';
    // 3) encontrar índice de "🧾 Ingredientes:"
    const idx = lines.findIndex(l => l.startsWith('🧾 Ingredientes'));
    // 4) parsear ingredientes desde idx+1 en adelante
    this.ingredients = [];
    if (idx >= 0) {
      for (let i = idx + 1; i < lines.length; i++) {
        const line = lines[i].replace(/^-/, '').trim();
        // formato: Name (Country) [📍 lat, long]
        const m = line.match(/^(.+)\s+\((.+)\)\s+\[📍\s*([-\d.]+),\s*([-\d.]+)\]/);
        if (m) {
          const [, name, country, lat, lng] = m;
          this.ingredients.push({
            name: name.trim(),
            country: country.trim(),
            coords: [ parseFloat(lat), parseFloat(lng) ]
          });
        }
      }
    }

    // 5) mostrar mapa
    this.showScanner = false;
    this.showMap = true;
    this.initMap();
  }

  ngAfterViewInit() {}

  private async initMap() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.map) this.map.remove();
  
    const L = await import('leaflet');
  
    // 1. Definir el icono personalizado
    const customIcon = L.icon({
      iconUrl: 'assets/images/marker.png',  // ruta relativa a /dist
      iconSize:     [32, 32],               // tamaño del icono
      iconAnchor:   [16, 32],               // punto del icono que corresponderá a la ubicación (centro-bajo)
      popupAnchor:  [0, -32]                // desde el icono dónde sale el popup
    });
  
    // 2. Inicializar mapa (centro genérico o primer ingrediente)
    const center: [number, number] = this.ingredients.length
      ? this.ingredients[0].coords
      : [4.5, -74.1];
    this.map = L.map(this.mapContainer.nativeElement)
            .setView(center, 6);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  
    // 3. Añadir marcadores con el icono personalizado
    this.ingredients.forEach(ing => {
      L.marker(ing.coords, { icon: customIcon })
       .addTo(this.map)
       .bindPopup(`<strong>${ing.name}</strong><br>${ing.country}`);
    });
  }
  

  ngOnDestroy() {
    if (this.map && isPlatformBrowser(this.platformId)) {
      this.map.remove();
    }
  }
}
