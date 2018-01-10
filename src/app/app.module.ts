import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicStorageModule } from "@ionic/storage";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { UpdatePageModule } from "../pages/update/update.module";
//import { AddPage } from "../pages/add/add";
import { AddPageModule } from "../pages/add/add.module";
import { TaskProvider } from "../providers/task/task";
import { IdgeneraterProvider } from '../providers/idgenerater/idgenerater';
@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AddPageModule,
    IonicStorageModule.forRoot(),
    UpdatePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TaskProvider,
    IdgeneraterProvider
  ]
})
export class AppModule {}
