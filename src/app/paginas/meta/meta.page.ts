import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { arrowBackOutline } from 'ionicons/icons';
import { IntensidadModalComponent } from 'src/app/intensidad-modal/intensidad-modal.component';
import { UsuariosService } from 'src/app/servicios/usuarios';
import { auth } from 'src/app/firebase/firebase-config';

@Component({
  selector: 'app-meta',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, IntensidadModalComponent],
  templateUrl: './meta.page.html',
  styleUrls: ['./meta.page.scss'],
})
export class MetaPage implements OnInit {
  arrowBack = arrowBackOutline;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  async seleccionar(meta: string) {
    meta = meta.toLowerCase().trim();

    const user = auth.currentUser;
    if (!user) {
      alert('No hay usuario logueado');
      return;
    }

    // Si es mantenimiento, abrimos directamente el modal
    if (meta === 'mantenimiento') {
      try {
        const usuario: any = await this.usuariosService.obtenerUsuario(user.uid);
        const mci = usuario?.mci || 0;

        const modal = await this.modalCtrl.create({
          component: IntensidadModalComponent,
          componentProps: { calorias: mci },
          cssClass: 'modal-intensidad'
        });
        await modal.present();
      } catch (err) {
        console.error('Error al obtener usuario:', err);
        alert('No se pudo obtener tus calorías para mantenimiento.');
      }
    } else {
      // Para déficit o superávit, navegamos a IntensityPage
      this.router.navigate(['/intensidad', { meta }]);
    }
  }
}
