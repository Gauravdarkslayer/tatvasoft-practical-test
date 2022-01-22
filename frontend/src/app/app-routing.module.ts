import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services';
import { NoAuthGuardService } from './core/services';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  { path: 'auth',canActivate:[NoAuthGuardService], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'blogs',canActivate:[AuthGuardService], loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
