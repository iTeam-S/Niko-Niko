import { Component, OnInit } from '@angular/core';
import { navbar } from './nav-menu';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  navMenu!: { 
    label: string; 
    icon: string;
    route: string;
  }[];

  constructor() { }

  ngOnInit(): void {
    this.navMenu = navbar;
  }

}
