import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgtButtonModule, NgtDatatableModule, NgtHttpService, NgtInputModule } from 'ng-tailwind';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgtInputModule,
    NgtDatatableModule,
    NgtButtonModule,
  ],
  providers: [
    {
      provide: NgtHttpService,
      useClass: HttpService
    },
    {
      provide: 'NgtPortletStyle',
      useValue: {
        color: {
          bg: 'bg-white',
          text: 'text-gray-700'
        },
        mx: 'mx-3 md:mx-6',
        my: 'my-8',
        h: 'h-auto',
      }
    },
    {
      provide: 'NgtInputStyle',
      useValue: {
        h: 'h-10',
        color: {
          border: 'border-gray-400 focus:border-blue-500',
          text: 'text-gray-800'
        }
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
