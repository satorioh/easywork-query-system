import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    DatePickerComponent,
    TableComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [RecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
