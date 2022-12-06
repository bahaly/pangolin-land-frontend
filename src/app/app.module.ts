import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { PangolinComponent } from './pangolin/pangolin.component';
import { OnePangolinComponent } from './pangolin/one-pangolin/one-pangolin.component';
import { PangolinListComponent } from './pangolin/pangolin-list/pangolin-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { PangolinFriendComponent } from './pangolin/pangolin-friend/pangolin-friend.component';

import { AuthInterceptor } from 'interceptor/auth-interceptor';
import { AuthGuard } from './services/auth-guard.service';
import { MatDialogModule } from '@angular/material/dialog';
import { EditRoleComponent } from './pangolin/edit-role/edit-role.component';
import { AddNewFriendComponent } from './add-new-friend/add-new-friend.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    AuthComponent,
    PangolinComponent,
    OnePangolinComponent,
    PangolinListComponent,
    HomeComponent,
    PangolinFriendComponent,
    EditRoleComponent,
    AddNewFriendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
