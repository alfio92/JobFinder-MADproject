import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverHomeNavbarPage } from './popover-home-navbar';

@NgModule({
  declarations: [
    PopoverHomeNavbarPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverHomeNavbarPage),
  ],
})
export class PopoverHomeNavbarPageModule {}
