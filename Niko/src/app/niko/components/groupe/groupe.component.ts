import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelGroupLists, ModelMyGroupe } from 'src/app/core/models/niko.model';
import { NikoService } from 'src/app/core/services/niko.service';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.scss']
})
export class GroupeComponent implements OnInit {
  listGroup!: ModelMyGroupe[];
  constructor(
    private nikoService: NikoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nikoService.getMyListGroup().subscribe({
      next: (response) => this.listGroup = response
    });
  }

  onViewGroupe(groupe_id: number): void {
    this.router.navigateByUrl(`/niko/group/${groupe_id}`);
  }
}
