import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobadPopoverPage } from './jobad-popover';

@NgModule({
  declarations: [
    JobadPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(JobadPopoverPage),
  ],
})
export class JobadPopoverPageModule {}
