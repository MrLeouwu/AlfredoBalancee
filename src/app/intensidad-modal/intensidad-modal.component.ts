import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intensidad-modal',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './intensidad-modal.component.html',
  styleUrls: ['./intensidad-modal.component.scss']
})
export class IntensidadModalComponent {
  @Input() calorias: number = 0; // Recibe el valor desde IntesidadPage

  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  irADieta() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/dieta']);
  }
}
