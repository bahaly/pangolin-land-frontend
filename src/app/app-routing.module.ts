import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewFriendComponent } from './add-new-friend/add-new-friend.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { OnePangolinComponent } from './pangolin/one-pangolin/one-pangolin.component';
import { PangolinFriendComponent } from './pangolin/pangolin-friend/pangolin-friend.component';
import { PangolinListComponent } from './pangolin/pangolin-list/pangolin-list.component';
import { PangolinComponent } from './pangolin/pangolin.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth', component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '**', redirectTo: 'auth/login' }
    ]
  },
  { path: 'pangolin', component: PangolinComponent,
    children: [
      { path: 'all', component: PangolinListComponent , canActivate: [AuthGuard]},
      { path: 'friend', component: PangolinFriendComponent , canActivate: [AuthGuard]},
      { path: 'add-friend', component: AddNewFriendComponent , canActivate: [AuthGuard]},
      { path: ':id', component: OnePangolinComponent , canActivate: [AuthGuard]},
      { path: '**', redirectTo: 'pangolin/all'},
      { path: '', pathMatch: 'full', component: PangolinListComponent,canActivate: [AuthGuard] },
    ]
  },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
