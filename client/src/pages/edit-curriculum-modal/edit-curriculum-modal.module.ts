import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCurriculumModalPage } from './edit-curriculum-modal';

@NgModule({
  declarations: [
    EditCurriculumModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCurriculumModalPage),
  ],
})
export class EditCurriculumModalPageModule {}
