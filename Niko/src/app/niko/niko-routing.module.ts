import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { CreateGroupeComponent } from './components/create-groupe/create-groupe.component';
import { GroupeCreatedComponent } from './components/groupe-created/groupe-created.component';
import { GroupeComponent } from './components/groupe/groupe.component';
import { HomeComponent } from './components/home/home.component';
import { SingleGroupeComponent } from './components/single-groupe/single-groupe.component';

const routes: Routes = [
  { path: '', component: BodyComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'group', component: GroupeComponent },
      { path: 'group/:id', component: SingleGroupeComponent },
      { path: 'settings', component: CreateGroupeComponent },
      { path: 'settings/group/:id', component: GroupeCreatedComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NikoRoutingModule { }
