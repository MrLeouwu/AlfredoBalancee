import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { auth, db } from 'src/app/firebase/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {

  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  mci: number = 0;        // Puedes calcular o dejar en 0
  calorias: number = 0;   // Puedes calcular o dejar en 0

  constructor(private router: Router) {}

  async registrar() {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, this.correo, this.contrasena);
      const uid = userCredential.user.uid;

      // Guardamos información adicional en Firestore
      await setDoc(doc(db, "usuarios", uid), {
        nombre: this.nombre,
        correo: this.correo,
        mci: this.mci,
        calorias: this.calorias
      });

      alert('Usuario registrado correctamente!');
      this.router.navigate(['/inicio']); // Redirige al inicio

    } catch (error) {
      console.error("Error registro:", error);
      alert("Error al registrar: " + (error as any).message);
    }
  }
}
