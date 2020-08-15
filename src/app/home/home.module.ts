import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { BrightnessScrollComponent } from '../components/brightness-scroll/brightness-scroll.component';

import { Appbright } from '../components/bright-scroll/bright-scroll.component'

import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    Ng5SliderModule,
  ],
  declarations: [HomePage, BrightnessScrollComponent, Appbright]
})
export class HomePageModule {}
