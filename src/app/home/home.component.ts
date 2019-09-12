import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants = [];
  citys = [];
  city = '""';
  constructor(public data: ApiService) {}
  restaurante = {};
  ngOnInit() {
    this.data.getCity().subscribe(data => {
      this.citys = data;
      console.log(this.citys);
    });
  }

  solicitar() {
    this.data.getRestaurantsCity(this.city).subscribe(data => {
      this.restaurante = data;
      console.log(this.restaurante);
    });
  }

  send(item) {
    localStorage.setItem('restaurante', JSON.stringify(item));
  }
}
