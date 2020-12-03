import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'intro',
        loadChildren: () => import('./views/intro/intro.module').then(m => m.IntroModule)
      },
      {
        path: 'add-question',
        loadChildren: () => import('./views/add-question/add-question.module').then(m => m.AddQuestionModule)
      },
      {
        path: 'question',
        loadChildren: () => import('./views/question/question.module').then(m => m.QuestionModule)
      },
      {
        path: 'add-group',
        loadChildren: () => import('./views/add-group/add-group.module').then(m => m.AddGroupModule)
      },
      {
        path: 'add-subgroup',
        loadChildren: () => import('./views/add-subgroup/add-subgroup.module').then(m => m.AddSubgroupModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
