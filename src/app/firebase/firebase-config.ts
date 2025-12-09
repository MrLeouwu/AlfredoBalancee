// src/app/firebase/firebase-config.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAe0SaiHB5Ubd5LmM31GaBAvAYgJb1YuwE",
  authDomain: "alfredo-51639.firebaseapp.com",
  projectId: "alfredo-51639",
  storageBucket: "alfredo-51639.firebasestorage.app",
  messagingSenderId: "1082005852514",
  appId: "1:1082005852514:web:f8584ec517d0a674351c3b"
};

// Inicializa Firebase solo si no hay apps inicializadas
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Exporta Auth y Firestore para usarlos en otras páginas
export const auth = getAuth();
export const db = getFirestore();
