import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',   
  imports: [HttpClientModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showProducerOptions = false;

  constructor(private router: Router) {}

  toggleProducerOptions() {
    this.showProducerOptions = !this.showProducerOptions;
  }

  goToCreateProduct() {
    this.router.navigate(['/create-product']);
    this.showProducerOptions = false;
  }

  goToCreateIngredient() {
    this.router.navigate(['/create-ingredient']);
    this.showProducerOptions = false;
  }
}