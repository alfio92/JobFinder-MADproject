import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestReplyPopoverPage } from './request-reply-popover';

@NgModule({
  declarations: [
    RequestReplyPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestReplyPopoverPage),
  ],
})
export class RequestReplyPopoverPageModule {}
