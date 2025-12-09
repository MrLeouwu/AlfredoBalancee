import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios';
import { SpoonacularService } from 'src/app/servicios/spoonacular';
import { auth } from 'src/app/firebase/firebase-config';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-dieta',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './dieta.page.html',
  styleUrls: ['./dieta.page.scss'],
})
export class DietaPage implements OnInit {

  calorias: number = 0;
  dieta: any = null;
  cargando: boolean = true;
  error: string = '';
  arrowBackOutline = arrowBackOutline;

  constructor(
    private usuariosService: UsuariosService,
    private spoonacular: SpoonacularService
  ) {}

  async ngOnInit() {
    const user = auth.currentUser;
    if (!user) {
      this.error = 'No hay usuario logueado';
      this.cargando = false;
      return;
    }

    try {
      const usuario: any = await this.usuariosService.obtenerUsuario(user.uid);
      this.calorias = usuario?.calorias || 0;

      if (this.calorias > 0) {
        this.spoonacular.generarDieta(this.calorias).subscribe({
          next: (res) => {
            this.dieta = res; 
            this.cargando = false;
          },
          error: (err) => {
            console.error('Error al generar dieta:', err);
            this.error = 'No se pudo generar la dieta';
            this.cargando = false;
          }
        });
      } else {
        this.error = 'No hay calorías asignadas para el usuario';
        this.cargando = false;
      }
    } catch (err) {
      console.error('Error al obtener usuario:', err);
      this.error = 'Error al obtener datos del usuario';
      this.cargando = false;
    }
  }

}
