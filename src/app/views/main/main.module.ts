import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntroComponent} from './intro/intro.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MainRoutingModule } from './main-routing.module'
@NgModule({
  imports: [
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MainRoutingModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DashboardComponent,IntroComponent ]
})
export class MainModule { }
