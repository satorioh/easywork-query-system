import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TableComponent } from './table/table.component';
import { HttpModule } from '@angular/http';
import {RecordService} from './services/record.service';
import { PaginationComponent } from './pagination/pagination.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    DatePickerComponent,
    TableComponent,
    PaginationComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [RecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
