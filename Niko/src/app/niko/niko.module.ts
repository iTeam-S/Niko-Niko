import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NikoRoutingModule } from './niko-routing.module';
import { BodyComponent } from './components/body/body.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CreateGroupeComponent } from './components/create-groupe/create-groupe.component';
import { GroupeComponent } from './components/groupe/groupe.component';

@NgModule({
  declarations: [
    BodyComponent,
    HomeComponent,
    CreateGroupeComponent,
    GroupeComponent
  ],
  imports: [
    CommonModule,
    NikoRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    BodyComponent,
    HomeComponent,
    CreateGroupeComponent,
    GroupeComponent
  ]
})
export class NikoModule { }
