import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { auth } from 'src/app/firebase/firebase-config';
import { UsuariosService } from 'src/app/servicios/usuarios';
import { onAuthStateChanged, User } from 'firebase/auth';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  nombreUsuario: string = '';

  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    // Escucha los cambios de autenticación
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const usuario: any = await this.usuariosService.obtenerUsuario(user.uid);
          this.nombreUsuario = usuario?.nombre || 'Usuario';
        } catch (err) {
          console.error('Error al obtener nombre de usuario:', err);
          this.nombreUsuario = 'Usuario';
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  cerrarSesion() {
    auth.signOut()
      .then(() => this.router.navigate(['/login']))
      .catch(err => console.error('Error al cerrar sesión:', err));
  }
}

