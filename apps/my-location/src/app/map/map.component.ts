import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

@Component({
  selector: 'assignment2-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  title = 'My Location';
  map!: Map;
  vectorSource!: VectorSource;
  vectorLayer!: VectorLayer<VectorSource<Geometry>>;
  osm = new TileLayer({source: new OSM()});

  getLocation() {
    navigator.geolocation.watchPosition((position) => {
      const myLoc = new Feature({
        geometry: new Point(fromLonLat([position.coords.longitude, position.coords.latitude])),
      });

      this.vectorSource = new VectorSource({
        features: [myLoc],
      });

      this.vectorLayer = new VectorLayer({
        source: this.vectorSource,
      });

      this.map.setView(new View ({
        center: fromLonLat([position.coords.longitude, position.coords.latitude]),
        zoom: 10
      }));

      this.map.setLayers([this.osm, this.vectorLayer]);
    })
  }

  ngOnInit(): void {
    this.map = new Map({
      target: 'map-ol',
      layers: [
        this.osm
      ],
      view: new View({ 
        center: [0, 0],
        zoom: 2,
        maxZoom: 18, 
      }),
    });

    this.getLocation();
  }
}

