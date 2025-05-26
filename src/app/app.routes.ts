import { Routes } from '@angular/router';
import { ProductTraceComponent } from './product-trace/product-trace.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ListaIngredientesComponent } from './lista-ingredientes/lista-ingredientes.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CreateIngredientComponent } from './create-ingredient/create-ingredient.component';
import { TropicalBitesComponent } from './tropical-bites/tropical-bites.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent, title: 'Landing Page', },
    {
        path: '',
        component: InicioComponent,
        title: 'Inicio',
    },
    {
        path: 'inicio',
        component: InicioComponent,
        title: 'Inicio',
    },
    {
        path: 'product-trace',
        component: ProductTraceComponent,
        title: 'Product Trace',
    },
    {
        path: 'lista-productos',
        component: ListaProductosComponent,
        title: 'Lista de Productos',
    },
    {
        path: 'lista-ingredientes',
        component: ListaIngredientesComponent,
        title: 'Lista de Ingredientes',
    },
    {
        path: 'create-product',
        component: CreateProductComponent,
        title: 'Crear producto',
    },
    {
        path: 'create-ingredient',
        component: CreateIngredientComponent,
        title: 'Crear ingrediente',
    },
    {
      path: 'tropical-bites',
      component: TropicalBitesComponent,
      title: 'Tropical Bites',
    }
];
