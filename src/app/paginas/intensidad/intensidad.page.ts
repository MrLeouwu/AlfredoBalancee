import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuariosService } from 'src/app/servicios/usuarios';
import { arrowBackOutline, menuOutline } from 'ionicons/icons';
import { IntensidadModalComponent } from 'src/app/intensidad-modal/intensidad-modal.component';
import { auth } from 'src/app/firebase/firebase-config';

@Component({
  selector: 'app-intensidad',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, IntensidadModalComponent],
  templateUrl: './intensidad.page.html',
  styleUrls: ['./intensidad.page.scss'],
})
export class IntensidadPage implements OnInit {

  arrowback = arrowBackOutline;
  menubtn = menuOutline;

  meta: string = '';
  mci: number | null = null;
  calorias: number = 0;
  cargando: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private usuariosService: UsuariosService
  ) {}

  async ngOnInit() {
    this.meta = (this.route.snapshot.paramMap.get('meta') || '').toLowerCase().trim();

    const user = auth.currentUser;
    if (!user) {
      alert('No hay usuario logueado');
      this.cargando = false;
      return;
    }

    try {
      const usuario: any = await this.usuariosService.obtenerUsuario(user.uid);
      if (usuario && usuario['mci'] !== undefined) {
        this.mci = usuario['mci'];
        console.log('MCI cargado:', this.mci);
      } else {
        this.mci = 0;
        console.log('Usuario sin MCI');
      }
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      this.mci = 0;
    } finally {
      this.cargando = false;
    }
  }

  async calcularIntensidad(tipo: string) {
    if (this.mci === null) {
      alert('El MCI aún no se ha cargado.');
      return;
    }

    tipo = tipo.toLowerCase().trim();
    console.log('Meta:', this.meta, 'Tipo:', tipo, 'MCI:', this.mci);

    // Calcular calorías según meta e intensidad
    if (this.meta === 'deficit') {
      if (tipo === 'ligero') this.calorias = this.mci - 200;
      else if (tipo === 'moderado') this.calorias = this.mci - 500;
      else if (tipo === 'robusto') this.calorias = this.mci - 800;
    } else if (this.meta === 'superavit') {
      if (tipo === 'ligero') this.calorias = this.mci + 200;
      else if (tipo === 'moderado') this.calorias = this.mci + 500;
      else if (tipo === 'robusto') this.calorias = this.mci + 800;
    } else if (this.meta === 'mantenimiento') {
      this.calorias = this.mci;
    }

    console.log('Calorías calculadas:', this.calorias);

    // Guardar calorías calculadas en Firestore
    const user = auth.currentUser;
    if (user) {
      try {
        await this.usuariosService.actualizarMciYCalorias(user.uid, this.mci, this.calorias);
        console.log('Calorías guardadas en Firestore');
      } catch (error) {
        console.error('Error al actualizar calorías:', error);
      }
    }

    // Abrir modal con calorías ya calculadas
    await this.abrirModal();
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: IntensidadModalComponent,
      componentProps: { calorias: this.calorias },
      cssClass: 'modal-intensidad'
    });
    await modal.present();
  }

  regresar() {
    this.router.navigate(['/meta']);
  }
}
