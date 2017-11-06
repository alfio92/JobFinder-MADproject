import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobrequestlistPage } from './jobrequestlist';

@NgModule({
  declarations: [
    JobrequestlistPage,
  ],
  imports: [
    IonicPageModule.forChild(JobrequestlistPage),
  ],
})
export class JobrequestlistPageModule {}
