import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { QuestionRoutingModule } from './question-routing.module';
import { QuestionformComponent } from './component/questionform/questionform.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    FormsModule,ReactiveFormsModule,

    ChartsModule,
    BsDropdownModule,
    CommonModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    QuestionRoutingModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    NgxPaginationModule
  ],
  declarations: [QuestionComponent, QuestionformComponent]
})
export class QuestionModule { }
