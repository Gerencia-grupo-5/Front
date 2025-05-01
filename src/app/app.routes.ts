import { Routes } from '@angular/router';
import { ProductTraceComponent } from './product-trace/product-trace.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ListaIngredientesComponent } from './lista-ingredientes/lista-ingredientes.component';

export const routes: Routes = [
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
    }
];
