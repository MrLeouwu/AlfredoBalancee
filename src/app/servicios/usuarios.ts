// src/app/servicios/usuarios.service.ts
import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: Firestore) {}

  // Crear un nuevo usuario
  async crearUsuario(uid: string, nombre: string, correo: string, contrasena: string) {
    try {
      const usuarioRef = doc(this.firestore, 'usuarios', uid);
      await setDoc(usuarioRef, {
        nombre,
        correo,
        contrasena,   // guardar contraseña (si quieres cifrada sería mejor)
        mci: 0,
        calorias: 0
      });
      console.log('Usuario creado correctamente');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  // Obtener un usuario por ID
  async obtenerUsuario(uid: string) {
    try {
      const usuarioRef = doc(this.firestore, 'usuarios', uid);
      const docSnap = await getDoc(usuarioRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log('No existe el usuario');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  }

  // Actualizar MCI y calorías de un usuario
  async actualizarMciYCalorias(uid: string, mci: number, calorias: number) {
    try {
      const usuarioRef = doc(this.firestore, 'usuarios', uid);
      await updateDoc(usuarioRef, { mci, calorias });
      console.log('MCI y calorías actualizadas correctamente');
    } catch (error) {
      console.error('Error al actualizar MCI y calorías:', error);
      throw error;
    }
  }

}
