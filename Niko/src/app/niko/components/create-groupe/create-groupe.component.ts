import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelGroupLists, ModelMembreGroup } from 'src/app/core/models/niko.model';
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
  currentGroupe!: ModelGroupLists | null;
  membreGroupe!: ModelMembreGroup[];
  iconeToastMembre!: any;
  titreToastMembre!: string | null;
  messageToastMembre!: string | null;
  formUpdateGroup!: FormGroup;

  constructor(
    private nikoService: NikoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currentGroupe = null;
    this.nikoService.getListsOfGroups().subscribe({
      next: (response) => this.listsGroups = response
    });
    this.formCreateGroup = this.formBuilder.group({
      nom: [null, Validators.required]
    });
    this.formUpdateGroup = this.formBuilder.group({
      nom: [null, Validators.required]
    });
  }

  onCreateGroup(): void {
    let toast = new window.bootstrap
      .Toast(document.getElementById('liveToastNotification'));
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

  onGetDataGroup(data: ModelGroupLists): void {
    this.currentGroupe = data;
  }

  onCancelGroupe(): void {
    this.currentGroupe = null;
  }

  onRemoveGroupe(): void {
    let toast = new window.bootstrap
      .Toast(document.getElementById('liveToastNotification'));
    this.nikoService.removeGroupe(this.currentGroupe?.id).subscribe({
      next: () => {
        this.iconeToast = "check_circle";
        this.titreToast = "Groupe";
        this.messageToast = "Supprimer avec succès !"
        toast.show();
        this.currentGroupe = null;
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
        this.currentGroupe = null
      }
    });
  }

  onloadData(data: ModelGroupLists): void {
    this.currentGroupe = data;
    this.formUpdateGroup = this.formBuilder.group({
      nom: [this.currentGroupe.nom_groupe, Validators.required]
    });
    this.nikoService.getMembreGroupe(this.currentGroupe?.id).subscribe({
      next: (response) => this.membreGroupe = response
    });
  }

  onRemoveMembre(data: ModelMembreGroup): void {
    let toast = new window.bootstrap
    .Toast(document.getElementById('liveToastNotificationMembre'));
    this.nikoService.removeMembreGroupe(data.id).subscribe({
      next: () => {
        this.iconeToastMembre = "check_circle";
        this.titreToastMembre = "Membre";
        this.messageToastMembre = "Supprimer avec succès !"
        toast.show();
        this.nikoService.getMembreGroupe(this.currentGroupe?.id).subscribe({
          next: (response) => this.membreGroupe = response
        });
      },
      error: (res) => {
        if(res.status === 406) {
          this.iconeToastMembre = "warning";
          this.titreToastMembre = "Erreur";
          this.messageToastMembre = "Veuillez respecter le type de données..."
        }
        else {
          this.iconeToastMembre = "error";
          this.titreToastMembre = "Erreur";
          this.messageToastMembre = res.error.message
        }
        toast.show();
      }
    });
  }

  onUpdateGroup(): void {
    const donnees = { 
      id: this.currentGroupe?.id, 
      ...this.formUpdateGroup.value 
    };
    let toast = new window.bootstrap
    .Toast(document.getElementById('liveToastNotificationMembre'));
    this.nikoService.updateGroupe(donnees).subscribe({
      next: () => {
        this.iconeToastMembre = "check_circle";
        this.titreToastMembre = "Nom du groupe";
        this.messageToastMembre = "Modifié avec succès !"
        toast.show();
        this.nikoService.getListsOfGroups().subscribe({
          next: (response) => {
            this.listsGroups = response
            this.listsGroups.filter((resultats) => {
              if(resultats.id === this.currentGroupe?.id) 
                this.currentGroupe = resultats;
            })
          }
        });
      },
      error: (res) => {
        if(res.status === 406) {
          this.iconeToastMembre = "warning";
          this.titreToastMembre = "Erreur";
          this.messageToastMembre = "Veuillez respecter le type de données..."
        }
        else {
          this.iconeToastMembre = "error";
          this.titreToastMembre = "Erreur";
          this.messageToastMembre = res.error.message
        }
        toast.show();
      }
    });
  }
}
