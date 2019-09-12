import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ruta = 'http://opentable.herokuapp.com/api/';
  constructor(public http: HttpClient) { }
  restaurants: any;
  city: any;
  getRestaurantsCity(city) {
    // console.log(city);
    this.restaurants = this.http.get(this.ruta + `restaurants?city=${city}`);
    return this.restaurants;
   }

   getCity()  {
      this.city = this.http.get(this.ruta + 'cities');
      return this.city;
   }
}
