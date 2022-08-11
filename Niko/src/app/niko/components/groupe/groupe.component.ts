import { Component, OnInit } from '@angular/core';
import { ModelGroupLists } from 'src/app/core/models/niko.model';
import { NikoService } from 'src/app/core/services/niko.service';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.scss']
})
export class GroupeComponent implements OnInit {
  listGroup!: ModelGroupLists[];
  constructor(
    private nikoService: NikoService
  ) { }

  ngOnInit(): void {
    this.nikoService.getMyListGroup().subscribe({
      next: (response) => this.listGroup = response
    });
  }

}
