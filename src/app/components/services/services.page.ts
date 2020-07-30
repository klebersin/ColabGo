import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  public services = [
    {
      serviceOwner: 'user 1',
      serviceName: 'service #1',
      serviceDescription: 'new service',
    },
    {
      serviceOwner: 'user 1',
      serviceName: 'service #2',
      serviceDescription: 'other service'
    },
    {
      serviceOwner: 'user 1',
      serviceName: 'service #3',
      serviceDescription: 'other service'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
