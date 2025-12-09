import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {

  private apiKey = 'e23d5d36318a44b6bdf72ff5bdbca4ac';
  private apiUrl = 'https://api.spoonacular.com/mealplanner/generate';

  constructor(private http: HttpClient) { }

  generarDieta(calorias: number): Observable<any> {
    const params = new HttpParams()
      .set('timeFrame', 'day')
      .set('targetCalories', calorias.toString())
      .set('apiKey', this.apiKey);

    return this.http.get(this.apiUrl, { params });
  }
}
