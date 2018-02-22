import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobadslistPage } from './jobadslist';

@NgModule({
  declarations: [
    JobadslistPage,
  ],
  imports: [
    IonicPageModule.forChild(JobadslistPage),
  ],
})
export class JobadslistPageModule {}
