import { Component } from '@angular/core';
import { IonHeader,IonItem, IonToolbar, IonLabel, IonTitle, IonContent, IonInput, IonButton, AlertController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/app/firebase/firebase-config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonItem, IonToolbar, IonLabel, IonTitle, IonContent, IonInput, IonButton, RouterLink],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  correo: string = '';
  contrasena: string = '';

  constructor(private router: Router, private alertCtrl: AlertController) {}

  async login() {
    if (!this.correo || !this.contrasena) {
      this.mostrarAlerta('Error', 'Por favor ingresa correo y contraseña');
      return;
    }

    try {
      // Inicia sesión con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, this.correo, this.contrasena);
      console.log('Usuario logueado:', userCredential.user);

      // Redirige a la página inicio
      this.router.navigate(['/inicio']);
    } catch (error: any) {
      console.error('Error login:', error);
      this.mostrarAlerta('Error', error.message || 'Ocurrió un error al iniciar sesión');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
