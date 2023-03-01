import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuPageComponent } from './menu-page/menu-page.component';
import { NotesPageComponent } from './notes-page/notes-page.component';

const routes: Routes = 
[
  { 
    path: 'menu', component: MenuPageComponent 
  },
  {
     path: 'notes', component: NotesPageComponent 
  },
  { 
    path: "**", redirectTo: "/menu", pathMatch: "full" 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
