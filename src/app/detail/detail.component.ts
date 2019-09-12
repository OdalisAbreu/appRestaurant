import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  restaurante = {};
  
  constructor(
    public router: Router,
    public activa: ActivatedRoute,
    public data: ApiService
  ) {
    this.restaurante = JSON.parse(localStorage.getItem('restaurante'));
    console.log(this.restaurante['lng']);
    console.log(this.restaurante);
  }

  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.key;
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.restaurante['lng'], this.restaurante['lat']],
      zoom: 12
    });
    var longitud = this.restaurante['lng'];
    var latitud = this.restaurante['lat'];
    map.on('load', function() {
      /* Image: An image is loaded and added to the map. */
      map.loadImage('https://i.imgur.com/MK4NUzI.png', function(error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);
        /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
        map.addLayer({
          id: 'markers',
          type: 'symbol',
          /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [longitud , latitud]
                  }
                }
              ]
            }
          },
          layout: {
            'icon-image': 'custom-marker'
          }
        });
      });
    });
  }
}
