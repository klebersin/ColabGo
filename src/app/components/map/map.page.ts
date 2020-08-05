import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ServiceService } from 'src/app/services/service.service';
import { Service } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { ServiceComponent } from '../service/service.component';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  public map: any;
  public lng: any;
  public lat: any;
  public services: Service[];
  public infoWindows = [];

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(private geo: Geolocation, private serviceService: ServiceService, private modal: ModalController) { }

  ionViewDidEnter() {
    this.getServices();
  }

  showMap() {
    const location = new google.maps.LatLng(this.lat, this.lng);
    const options = {
      center: location,
      zoom: 16,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    const mapMarker = new google.maps.Marker({
      position: location,
      title: 'Mi posición',
    });
    mapMarker.setMap(this.map);
    const cityCircle = new google.maps.Circle({
      strokeColor: '#c3fc49',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#c3fc49',
      fillOpacity: 0.35,
      map: this.map,
      center: location,
      radius: 250
    });

    this.printServices(this.services);
  }
  printServices(services: Service[]) {
    services.forEach(service => {
      const location = new google.maps.LatLng(service.serviceLat, service.serviceLng);
      const mapMarker = new google.maps.Marker({
        position: location,
        title: service.serviceName,
      });
      this.addInfoWindowToMarker(mapMarker, service);
      mapMarker.setMap(this.map);
    });
  }

  addInfoWindowToMarker(marker, service){
    const infoWindowContent = `<div id="contain"><h3 id="firstHeading" class="firstHeading">${marker.title}</h3><p>${service.serviceDescription}</p></div>`;
    const infowindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      this.closeAllWindows();
      infowindow.open(this.map, marker);
    });
    this.infoWindows.push(infowindow);
  }
  closeAllWindows() {
    for (const window of this.infoWindows){
    }
  }
  getPosition() {
    this.geo.getCurrentPosition().then(
      res => {
        this.lat = res.coords.latitude;
        this.lng = res.coords.longitude;
        this.showMap();
      }
    );

  }
  getServices() {
    this.serviceService.getServices().subscribe(
      res => {
        this.services = res;
        this.getPosition();
      }
    );
  }
  openService(service: Service){
    this.modal.create({
      component: ServiceComponent,
      componentProps: {
        serviceName: service.serviceName,
        serviceDescription: service.serviceDescription,
        serviceLat: service.serviceLat,
        serviceLng: service.serviceLng,
        serviceContact: service.serviceContact
      }
    }).then( (modal) => modal.present());
  }
}


