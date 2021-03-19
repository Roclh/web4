import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import {SliderModule} from 'primeng/slider';
import {DropdownModule} from 'primeng/dropdown';
import { CanvasComponent } from './canvas/canvas.component';
import { AuthComponent } from './pages/auth/auth.component';
import { MainComponent } from './pages/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthFormComponent } from './auth-form/auth-form.component';
import {InputTextModule} from 'primeng/inputtext';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {ButtonModule} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {ConfigService} from './services/config.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HeaderComponent,
    CanvasComponent,
    AuthComponent,
    MainComponent,
    AuthFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    SliderModule,
    FormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    InputTextModule,
    SimpleNotificationsModule.forRoot(),
    ButtonModule
  ],
  providers: [
    HttpClient,
    ConfigService,
    {
      provide: 'login',
      useValue: '/api/auth/login'
    },
    {
      provide: 'register',
      useValue: '/api/auth/register'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
