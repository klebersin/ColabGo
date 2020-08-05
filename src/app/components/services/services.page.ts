import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { ServiceComponent } from '../service/service.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  public services: Service[];

  constructor(private serviceServices: ServiceService, private modal: ModalController) { }

  ngOnInit() {
    this.getServices();
  }

  getServices(){
    this.serviceServices.getServices().subscribe( services => {
      this.services = services;
    } );
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

  doRefresh(event) {
    setTimeout(() => {
      this.getServices();
      event.target.complete();
    }, 1000);
  }
}
