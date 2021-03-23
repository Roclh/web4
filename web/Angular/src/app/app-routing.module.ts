import { NgModule } from '@angular/core';
import {AuthComponent} from './pages/auth/auth.component';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {AuthService} from './services/auth.service';

const routes: Routes = [

  {path: 'auth', component : AuthComponent},
  {path: '', component : MainComponent, canActivate: [AuthService]},
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
