import {Routes} from '@angular/router';
import {authGuard} from "./auth.guard";
import {PageNotFoundComponent} from "./views/not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./views/login/login.component').then(mod => mod.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./views/register/register.component').then(mod => mod.RegisterComponent)
  },
  {path: 'posts', loadComponent: () => import('./views/posts/posts.component').then(mod => mod.PostsComponent)},

  {
    path: 'posts/new',
    loadComponent: () => import('./views/add-post/add-post.component').then(mod => mod.AddPostComponent),
    canActivate: [authGuard]
  },
  {path: '**', component: PageNotFoundComponent},
];
