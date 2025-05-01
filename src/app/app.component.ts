import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CreateIngredientComponent } from './create-ingredient/create-ingredient.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CreateProductComponent, CreateIngredientComponent, LandingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}

