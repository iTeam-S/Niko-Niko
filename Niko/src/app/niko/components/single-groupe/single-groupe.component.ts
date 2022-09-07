import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ModelCreateHumeur, ModelNomGroupe, ModelSingleGroupe } from 'src/app/core/models/niko.model';
import { NikoService } from 'src/app/core/services/niko.service';
declare var window: any;

@Component({
  selector: 'app-single-groupe',
  templateUrl: './single-groupe.component.html',
  styleUrls: ['./single-groupe.component.scss']
})
export class SingleGroupeComponent implements OnInit {
  groupe_id!: number;
  groupe$!: Observable<ModelNomGroupe>;
  SingleGroupe!: ModelSingleGroupe[];
  moodForm!: FormGroup
  moodRegex: RegExp = /[😊😁😌😠😡]/;
  iconeToast!: any;
  titreToast!: string | null;
  messageToast!: string | null;
  constructor(
    private nikoService: NikoService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.groupe_id = +this.route.snapshot.params['id'];
    this.groupe$ = this.nikoService.getNomGroupe(this.groupe_id);
    this.nikoService.getSingleGroupe(this.groupe_id).subscribe({
      next: response => this.SingleGroupe = response,
      error: (e) => console.log(`Il y a une erreur...! ${e}`)
    });

    this.moodForm = this.formBuilder.group({
      humeur_type: [null, [Validators.required, 
        Validators.pattern(this.moodRegex)]]
    });
  }

  onSendMood(): void {
    const humeur: ModelCreateHumeur = {
      ...this.moodForm.value,
      groupe_id: this.groupe_id,
    };
    let toast = new window.bootstrap
    .Toast(document.getElementById('liveToastNotification'));
    this.nikoService.createMood(humeur).subscribe({
      next: () => {
        this.iconeToast = "check_circle";
        this.titreToast = "Humeur";
        this.messageToast = "Créé avec succès. Merci !";
        toast.show();
        this.nikoService.getSingleGroupe(this.groupe_id).subscribe({
          next: response => this.SingleGroupe = response,
          error: (e) => console.log(`Il y a une erreur...! ${e}`)
        });
      },
      error: (response) => {
        if(response.status === 403) {
          this.iconeToast = "warning";
          this.titreToast = "Erreur";
          this.messageToast = response.error.message;
        }
        else if(response.status === 401) {
          this.iconeToast = "error";
          this.titreToast = "Erreur";
          this.messageToast = response.error.message + 
            ". Veuillez-vous authentifier...!";
        }
        else if(response.status === 500) {
          this.iconeToast = "error";
          this.titreToast = "Erreur";
          this.messageToast = response.error.message;
        }
        else {
          this.iconeToast = "error";
          this.titreToast = "Erreur";
          this.messageToast = "Une erreur s'est produit...!";
        }
        toast.show();
      }
    });
  }
}
