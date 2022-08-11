import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NikoService } from 'src/app/core/services/niko.service';

@Component({
  selector: 'app-groupe-created',
  templateUrl: './groupe-created.component.html',
  styleUrls: ['./groupe-created.component.scss']
})
export class GroupeCreatedComponent implements OnInit {

  constructor(
    private nikoService: NikoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
