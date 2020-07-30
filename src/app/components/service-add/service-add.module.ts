import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceAddPageRoutingModule } from './service-add-routing.module';

import { ServiceAddPage } from './service-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceAddPageRoutingModule
  ],
  declarations: [ServiceAddPage]
})
export class ServiceAddPageModule {}
