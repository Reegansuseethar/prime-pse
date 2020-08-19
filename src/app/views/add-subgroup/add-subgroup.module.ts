import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddSubgroupRoutingModule } from './add-subgroup-routing.module';
import { AddSubgroupComponent } from './add-subgroup.component';

@NgModule({
  declarations: [AddSubgroupComponent],
  imports: [
    CommonModule,
    AddSubgroupRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddSubgroupModule { }
