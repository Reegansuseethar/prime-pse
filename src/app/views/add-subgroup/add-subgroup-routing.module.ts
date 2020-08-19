import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubgroupComponent } from './add-subgroup.component';

const routes: Routes = [
  {
    path: '',
    component: AddSubgroupComponent,
    data: {
      title: 'Add Subgroup'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSubgroupRoutingModule { }
