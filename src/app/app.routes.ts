import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./paginas/login/login.page').then(m => m.LoginPage)
  },
  { 
    path: 'inicio', 
    loadComponent: () => import('./paginas/inicio/inicio.page').then(m => m.InicioPage) 
  },
  { 
    path: 'macros', 
    loadComponent: () => import('./paginas/macros/macros.page').then(m => m.MacrosPage) 
  },
  { 
    path: 'calculadora', 
    loadComponent: () => import('./paginas/calculadora/calculadora.page').then(m => m.CalculadoraPage) 
  },
  { 
    path: 'meta', 
    loadComponent: () => import('./paginas/meta/meta.page').then(m => m.MetaPage) 
  },
  { 
    path: 'intensidad', 
    loadComponent: () => import('./paginas/intensidad/intensidad.page').then(m => m.IntensidadPage) 
  },
  { 
    path: 'dieta', 
    loadComponent: () => import('./paginas/dieta/dieta.page').then(m => m.DietaPage) 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./paginas/login/login.page').then(m => m.LoginPage) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./paginas/register/register.page').then(m => m.RegisterPage) 
  },
];
