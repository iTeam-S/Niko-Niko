import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModelGroupLists } from 'src/app/core/models/niko.model';
import { NikoService } from 'src/app/core/services/niko.service';
declare var window: any;

@Component({
  selector: 'app-create-groupe',
  templateUrl: './create-groupe.component.html',
  styleUrls: ['./create-groupe.component.scss']
})
export class CreateGroupeComponent implements OnInit {
  listsGroups!: ModelGroupLists[];
  formCreateGroup!: FormGroup;
  iconeToast!: any;
  titreToast!: string | null;
  messageToast!: string | null;
  currentGroupe_id!: number | null;

  constructor(
    private nikoService: NikoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currentGroupe_id = null;
    this.nikoService.getListsOfGroups().subscribe({
      next: (response) => this.listsGroups = response
    });
    this.formCreateGroup = this.formBuilder.group({
      nom: [null, Validators.required]
    });
  }

  onCreateGroup(): void {
    let toast = new window.bootstrap
      .Toast(document.getElementById('liveToastFormations'));
    this.nikoService.createGroup(this.formCreateGroup.value)
      .subscribe({
        next: () => {
          this.iconeToast = "check_circle";
          this.titreToast = "Groupe";
          this.messageToast = "Créé avec succès. Merci !"
          toast.show();
          this.nikoService.getListsOfGroups().subscribe({
            next: (response) => this.listsGroups = response
          });
        },
        error: (res) => {
          if(res.status === 406) {
            this.iconeToast = "warning";
            this.titreToast = "Erreur";
            this.messageToast = "Veuillez respecter le type de données..."
          }
          else {
            this.iconeToast = "error";
            this.titreToast = "Erreur";
            this.messageToast = res.error.message
          }
          toast.show();
        }
      });
  }

  onGetIdGroupe(data: ModelGroupLists): void {
    this.currentGroupe_id = data.id;
  }

  onCancelGroupe(): void {
    this.currentGroupe_id = null;
  }

  onRemoveGroupe(): void {
    let toast = new window.bootstrap
      .Toast(document.getElementById('liveToastFormations'));
    this.nikoService.removeGroupe(this.currentGroupe_id).subscribe({
      next: () => {
        this.iconeToast = "check_circle";
        this.titreToast = "Groupe";
        this.messageToast = "Supprimer avec succès !"
        toast.show();
        this.currentGroupe_id = null;
        this.nikoService.getListsOfGroups().subscribe({
          next: (response) => this.listsGroups = response
        });
      },
      error: (res) => {
        if(res.status === 406) {
          this.iconeToast = "warning";
          this.titreToast = "Erreur";
          this.messageToast = "Veuillez respecter le type de données..."
        }
        else {
          this.iconeToast = "error";
          this.titreToast = "Erreur";
          this.messageToast = res.error.message
        }
        toast.show();
        this.currentGroupe_id = null
      }
    });
  }
}
