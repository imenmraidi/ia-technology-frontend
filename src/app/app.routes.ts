import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { AdminComponent } from './admin/admin.component';

// export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'home', component: HomeComponent, canActivate: [authGuard] },
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: '**', redirectTo: '/home' }
// ];

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Public home
  { path: 'login', component: LoginComponent }, // Public
  { path: 'register', component: RegisterComponent }, // Public

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin'] }, // Role-protected
  },
];
