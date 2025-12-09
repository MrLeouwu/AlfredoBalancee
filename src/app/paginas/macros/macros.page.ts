import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonMenu,
  IonMenuButton,
  IonButtons,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonThumbnail
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

import { arrowBackOutline } from 'ionicons/icons'; // Icono de flecha

import { NutritionService, FoodNutrition } from 'src/app/servicios/nutrition';

interface FoodSearchResponse {
  foods: FoodNutrition[];
}

@Component({
  selector: 'app-macros',
  standalone: true,
  templateUrl: './macros.page.html',
  styleUrls: ['./macros.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonList,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonMenu,
    IonMenuButton,
    IonButtons,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonThumbnail,
    RouterModule  
  ],
})
export class MacrosPage implements OnInit {

  arrowBack = arrowBackOutline; // 🔹 Icono de flecha para botón de regresar

  query = '';
  sugerencias: FoodNutrition[] = [];
  selected: FoodNutrition | null = null;
  gramos: number = 100;
  resultado: { calories: number; protein: number; carbs: number; fat: number } | null = null;

  constructor(private nutritionService: NutritionService) {}

  ngOnInit() {}

  buscar(): void {
    if (this.query.length < 2) {
      this.sugerencias = [];
      return;
    }

    this.nutritionService.buscarAlimentos(this.query).subscribe({
      next: (res: FoodSearchResponse) => {
        this.sugerencias = res.foods || [];
      },
      error: (err: any) => {
        console.error('Error al buscar alimentos:', err);
        this.sugerencias = [];
      }
    });
  }

  seleccionar(alimento: FoodNutrition): void {
    this.selected = alimento;
    this.resultado = null;
    this.sugerencias = [];
    this.query = '';
    console.log('Alimento seleccionado:', this.selected);
  }

  calcular(): void {
    if (!this.selected) return;

    const factor = Number(this.gramos) / 100;

    this.resultado = {
      calories: Math.round((Number(this.selected.calories) || 0) * factor),
      protein: Math.round((Number(this.selected.protein) || 0) * factor),
      carbs: Math.round((Number(this.selected.carbs) || 0) * factor),
      fat: Math.round((Number(this.selected.fat) || 0) * factor)
    };

    console.log('Resultado calculado:', this.resultado);
  }
}
