import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/interfaces/interfaces';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.page.html',
  styleUrls: ['./service-add.page.scss'],
})
export class ServiceAddPage {

  public showmap = false;
  public map: any;
  public lng: any;
  public lat: any;
  public service: Service = {
    serviceName: '',
    serviceDescription: '',
    serviceContact: '',
    serviceLat: '',
    serviceLng: ''
  };

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(private geo: Geolocation, private formBuilder: FormBuilder, private serviceService: ServiceService,
              private router: Router) {
   }

  showMap() {
    const location = new google.maps.LatLng(this.lat, this.lng);
    const options = {
      center: location,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    const mapMarker = new google.maps.Marker({
      position: location,
      title: 'Posición del servicio',
      latitude: this.lat,
      longitude: this.lng,
      draggable: true
    });
    mapMarker.setMap(this.map);
    google.maps.event.addListener(mapMarker, 'dragend', () => {
      this.service.serviceLat = mapMarker.getPosition().lat();
      this.service.serviceLng = mapMarker.getPosition().lng();
      this.lat = mapMarker.getPosition().lat();
      this.lng = mapMarker.getPosition().lng();
    });
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

  addService(){
    this.serviceService.addService(this.service).then(
      res => {
        this.service = {};
        this.router.navigate(['/main/services']);
      }
    ).catch(error => {
      alert('Algo salio mal');
    });
  }
}
