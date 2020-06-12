import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgtActionModule,
  NgtButtonModule,
  NgtDatatableModule,
  NgtHttpService,
  NgtInputModule,
  NgtStylizableModule,
} from 'ng-tailwind';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RadarModule } from './components/radar/radar.module';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RadarModule,
    NgtInputModule,
    NgtDatatableModule,
    NgtButtonModule,
    NgtActionModule,
    NgtStylizableModule
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
    {
      provide: 'NgtCheckboxStyle',
      useValue: {
        color: {
          bg: 'bg-blue-500',
        }
      }
    },
    {
      provide: 'NgtActionStyle',
      useValue: {
        w: 'w-8',
        h: 'h-8',
        color: {
          bg: 'bg-none hover:bg-blue-500',
          text: 'text-gray-600 hover:text-white'
        }
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
