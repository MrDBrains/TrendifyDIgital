import { Routes } from '@angular/router';
import { HomePage } from './features/home/Component/HomePage/HomePage';
import { LoginPage } from './features/auth/Component/LoginPage/LoginPage';
import { SignupPage } from './features/auth/Component/SignupPage/SignupPage';
import { Dashbord } from './features/home/Component/Dashbord/Dashbord';
import { MyCourse } from './features/home/Component/MyCourse/MyCourse';
import { ViewModule } from './features/home/Component/ViewModule/ViewModule';
import { MyProfile } from './features/home/Component/MyProfile/MyProfile';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'signup', component: SignupPage },
  {
    path: 'home',
    component: HomePage,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashbord },
      { path: 'myCource', component: MyCourse },
      { path: 'view-module', component: ViewModule },
      { path: 'my-Profile', component: MyProfile }
    ]
  },
  { path: '**', redirectTo: 'login' }
];




