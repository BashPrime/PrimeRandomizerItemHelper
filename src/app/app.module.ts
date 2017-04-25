import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ButtonsModule } from 'ng2-bootstrap/buttons';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation.component';
import { ItemLocationsComponent } from './item-locations/item-locations.component';
import { ItemsComponent } from './items/items.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ItemLocationsComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
