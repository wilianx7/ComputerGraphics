import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultPageComponent } from './pages/default-page/default-page.component';
import { DefaultPageModule } from './pages/default-page/default-page.module';

const routes: Routes = [
  {
    "path": "",
    "component": DefaultPageComponent,
    "children": [
      {
        "path": "home",
        "loadChildren": () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        "path": "",
        "redirectTo": "home",
        "pathMatch": "full"
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DefaultPageModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
