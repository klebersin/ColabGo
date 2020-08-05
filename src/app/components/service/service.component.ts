import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Service } from 'src/app/interfaces/interfaces';
import { SMS } from '@ionic-native/sms/ngx';

declare var google: any;

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {

  public service: Service;
  public map: any;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  constructor(private navParams: NavParams, private modal: ModalController, private sms: SMS) { }

  ionViewDidEnter() {
    this.showMap();
  }

  ngOnInit() {
    this.getService();
  }

  sendSMS() {
    const options = {
      replaceLineBreaks: false,
      android: {
        intent: 'INTENT'
      }
    };

    this.sms.send(this.service.serviceContact, 'Requiero tus servicios', options);
  }

  getService() {
    this.service = {
      serviceName: this.navParams.get('serviceName'),
      serviceDescription: this.navParams.get('serviceDescription'),
      serviceLat: this.navParams.get('serviceLat'),
      serviceLng: this.navParams.get('serviceLng'),
      serviceContact: this.navParams.get('serviceContact')
    };
  }

  showMap() {
    const location = new google.maps.LatLng(this.service.serviceLat, this.service.serviceLng);
    const options = {
      center: location,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    const mapMarker = new google.maps.Marker({
      position: location,
      title: 'Posición del servicio',
      latitude: this.service.serviceLat,
      longitude: this.service.serviceLng,
    });
    mapMarker.setMap(this.map);
  }
  closeModal() {
    this.modal.dismiss();
  }

}
