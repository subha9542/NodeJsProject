import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SportsComponent } from './components/sports/sports.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AdminNavBarComponent } from './components/admin-nav-bar/admin-nav-bar.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { MustMatchDirective } from './directives/must-match.directive';
import { HttpInterceptorService } from './services/req-interceptor.service';
import { EditNewsComponent } from './components/edit-news/edit-news.component';
import { ChatComponent } from './components/chat/chat.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { WeatherComponent } from './components/weather/weather.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactUsComponent,
    NotFoundComponent,
    HomePageComponent,
    FooterComponent,
    AboutUsComponent,
    SportsComponent,
    NavBarComponent,
    AdminNavBarComponent,
    LoginRegisterComponent,
    MustMatchDirective,
    EditNewsComponent,
    ChatComponent,
    AddNewsComponent,
    WeatherComponent,
    NewsListComponent,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
