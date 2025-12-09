import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';

// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAe0SaiHB5Ubd5LmM31GaBAvAYgJb1YuwE",
  authDomain: "alfredo-51639.firebaseapp.com",
  projectId: "alfredo-51639",
  storageBucket: "alfredo-51639.firebasestorage.app",
  messagingSenderId: "1082005852514",
  appId: "1:1082005852514:web:f8584ec517d0a674351c3b"
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideIonicAngular(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)), // Inicializa Firebase
    provideFirestore(() => getFirestore())                  // Inicializa Firestore
  ]
}).catch(err => console.error(err));
