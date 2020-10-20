import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { RouteGuardService } from './service/route-guard.service';
RouteGuardService

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'students', component: StudentListComponent, canActivate: [RouteGuardService],
  },
  {
    path: 'student-details/:id', component: StudentDetailsComponent, canActivate: [RouteGuardService],
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
