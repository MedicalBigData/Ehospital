import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { DetailPage } from '../pages/detail/detail';
import { RegisterPage } from '../pages/register/register';
import { Pm } from '../pipes/pm';
import { ImprovementPage } from '../pages/improvement/improvement'
import { HealthAdvicePage } from '../pages/health-advice/health-advice'
import { OppointmentPage } from '../pages/oppointment/oppointment'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    DetailPage,
    RegisterPage,
    Pm,
    ImprovementPage,
    HealthAdvicePage,
    OppointmentPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    DetailPage,
    RegisterPage,
    ImprovementPage,
    HealthAdvicePage,
    OppointmentPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage]
})
export class AppModule {}
