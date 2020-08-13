import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IntroComponent } from './intro/intro.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: DashboardComponent,
//     data: {
//       title: 'Dashboard'
//     }
//   }
// ];

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Main Page'
        },
      },
      {
        path: 'intro',
        component: IntroComponent,
        data: {
          title: 'Intro Page'
        },
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
