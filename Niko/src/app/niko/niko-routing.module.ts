import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { CreateGroupeComponent } from './components/create-groupe/create-groupe.component';
import { GroupeComponent } from './components/groupe/groupe.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: BodyComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'groupe', component: GroupeComponent },
      { path: 'create-groupe', component: CreateGroupeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NikoRoutingModule { }
