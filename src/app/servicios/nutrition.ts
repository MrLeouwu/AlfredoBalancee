import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface FoodNutrition {
  fdcId: number;
  description: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  private apiKey = 'dtGLnOdZF52rWNBzkMSZHXbTjgyesjYK2zFrYyRJ';
  private baseUrl = 'https://api.nal.usda.gov/fdc/v1/foods/search';

  // Diccionario inglés -> español
  private diccionario: { [key: string]: string } = {
    'Chicken breast': 'Pechuga de pollo',
    'Apple': 'Manzana',
    'Egg': 'Huevo',
    'Milk': 'Leche',
    'Banana': 'Plátano',
    'Beef': 'Carne de res',
    'Rice': 'Arroz',
    'Bread': 'Pan',
    'Cheese': 'Queso'
  };

  constructor(private http: HttpClient) {}

  private translateToSpanish(text: string): string {
    return this.diccionario[text] || text;
  }

  buscarAlimentos(query: string): Observable<{ foods: FoodNutrition[] }> {
    return this.http.get<any>(`${this.baseUrl}?query=${query}&pageSize=5&api_key=${this.apiKey}`)
      .pipe(
        map(res => {
          const foods: FoodNutrition[] = res.foods.map((f: any) => {
            // Mapear los nutrientes del array foodNutrients
            let protein = 0, carbs = 0, fat = 0, calories = 0;
            f.foodNutrients.forEach((n: any) => {
              const name = n.nutrientName.toLowerCase();
              if (name.includes('protein')) protein = n.value;
              if (name.includes('carbohydrate')) carbs = n.value;
              if (name.includes('total lipid') || name.includes('fat')) fat = n.value;
              if (name.includes('energy') || name.includes('calories')) calories = n.value;
            });

            return {
              fdcId: f.fdcId,
              description: this.translateToSpanish(f.description),
              protein,
              carbs,
              fat,
              calories
            };
          });
          return { foods };
        })
      );
  }

  obtenerMacros(fdcId: number): Observable<FoodNutrition> {
    return this.http.get<any>(`https://api.nal.usda.gov/fdc/v1/${fdcId}?api_key=${this.apiKey}`)
      .pipe(
        map(f => {
          let protein = 0, carbs = 0, fat = 0, calories = 0;
          f.foodNutrients.forEach((n: any) => {
            const name = n.nutrientName.toLowerCase();
            if (name.includes('protein')) protein = n.value;
            if (name.includes('carbohydrate')) carbs = n.value;
            if (name.includes('total lipid') || name.includes('fat')) fat = n.value;
            if (name.includes('energy') || name.includes('calories')) calories = n.value;
          });

          return {
            fdcId: f.fdcId,
            description: this.translateToSpanish(f.description),
            protein,
            carbs,
            fat,
            calories
          };
        })
      );
  }
}
