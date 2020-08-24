import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AddQuestionRoutingModule } from './add-question-routing.module';
import { AddQuestionComponent } from './add-question.component';


@NgModule({
  declarations: [AddQuestionComponent],
  imports: [
    CommonModule,
    AddQuestionRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class AddQuestionModule { }
