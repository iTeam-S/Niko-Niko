import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
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

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.navMenu = navbar;
  }

  onlogOut(): void {
    this.authService.logOut();
  }
}
