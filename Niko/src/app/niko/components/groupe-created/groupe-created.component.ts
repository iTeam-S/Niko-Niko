import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ModelGroupCreated, ModelNomGroupe } from 'src/app/core/models/niko.model';
import { NikoService } from 'src/app/core/services/niko.service';

@Component({
  selector: 'app-groupe-created',
  templateUrl: './groupe-created.component.html',
  styleUrls: ['./groupe-created.component.scss']
})
export class GroupeCreatedComponent implements OnInit {
  groupe_id!: number;
  groupe$!: Observable<ModelNomGroupe>;
  groupeCreated!: ModelGroupCreated[];
  iconeToast!: any;
  titreToast!: string | null;
  messageToast!: string | null;
  constructor(
    private nikoService: NikoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.groupe_id = +this.route.snapshot.params['id'];
    this.groupe$ = this.nikoService.getNomGroupe(this.groupe_id);
    this.nikoService.getMoodGroupes(this.groupe_id).subscribe({
      next: response => this.groupeCreated = response,
      error: (response) => {
        this.iconeToast = "warning";
        this.titreToast = "Erreur";
        this.messageToast = response.error.message;
      }
    });
  }
}
