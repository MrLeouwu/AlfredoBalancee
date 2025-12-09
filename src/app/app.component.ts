import { Component } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { auth } from 'src/app/firebase/firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public mostrarMenu = false; // Controla visibilidad del menú

  constructor(private menuCtrl: MenuController, private router: Router) {
    this.verificarSesion();
  }

  // Navegar y cerrar menú al mismo tiempo
  async navegar(ruta: string) {
    await this.menuCtrl.close(); // Cierra el menú
    const user = auth.currentUser;
    if (user) {
      this.router.navigate([ruta]);
    } else {
      console.warn('No hay usuario autenticado. Navegación cancelada.');
      this.router.navigate(['/login']); // Redirige al login
    }
  }



  // Verificar si hay sesión activa
  verificarSesion() {
    const firebaseAuth = getAuth();
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        this.mostrarMenu = true;  // Mostrar menú si hay sesión
        this.router.navigate(['/inicio']); // Ir a inicio
      } else {
        this.mostrarMenu = false; // Ocultar menú si no hay sesión
        this.router.navigate(['/login']); // Ir a login
      }
    });
  }
}
