import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { arrowBackOutline } from 'ionicons/icons';
import { UsuariosService } from 'src/app/servicios/usuarios';
import { auth } from 'src/app/firebase/firebase-config';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage {
  peso!: number;
  altura!: number;
  edad!: number;
  sexo: 'hombre' | 'mujer' = 'hombre';
  mciResult: number | null = null;
  arrowBack = arrowBackOutline;

  constructor(
    private usuariosService: UsuariosService
  ) {}

  calcular(): void {
    if (!this.peso || !this.altura || !this.edad) return;

    this.mciResult =
      this.sexo === 'hombre'
        ? Math.round(10 * this.peso + 6.25 * this.altura - 5 * this.edad + 5)
        : Math.round(10 * this.peso + 6.25 * this.altura - 5 * this.edad - 161);

  

    const user = auth.currentUser;
    if (user) {
      this.usuariosService
        .actualizarMciYCalorias(user.uid, this.mciResult, 0)
        .then(() => console.log('MCI guardado en Firestore'));
    }
  }
}
