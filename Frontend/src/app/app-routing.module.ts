import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { EditNewsComponent } from './components/edit-news/edit-news.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SportsComponent } from './components/sports/sports.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { AuthGuard } from './guard/auth.guard';
import { NewsListComponent } from './components/news-list/news-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login-register',
    component: LoginRegisterComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'sports',
    component: SportsComponent,
  },
  {
    path: 'news-list',
    component: NewsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-news',
    component: EditNewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-news/:id',
    component: EditNewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-news',
    component: AddNewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { message: 'Page not found!' },
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
