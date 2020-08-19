import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddGroupRoutingModule } from './add-group-routing.module';
import { AddGroupComponent } from './add-group.component';

@NgModule({
  declarations: [AddGroupComponent],
  imports: [
    CommonModule,
    AddGroupRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddGroupModule { }
