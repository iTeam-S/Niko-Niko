import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  logInForm!: FormGroup;
  inputTypePassword!: string;
  textShowPassword!: string;
  unauthorized!: boolean;
  errorMessage!: string;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) this.router.navigateByUrl('/niko');

    this.inputTypePassword = "password";
    this.textShowPassword = "Afficher le mot de passe";
    this.unauthorized = false;
    
    this.logInForm = this.formBuilder.group({
      identifiant: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onShowPassword(event: any): void {
    if(event.target.checked) {
      this.inputTypePassword = "text"
      this.textShowPassword = "Ne pas afficher le mot de passe"
     } 
     else {
      this.inputTypePassword = "password"
      this.textShowPassword = "Afficher le mot de passe"
    };
  }

  onSubmit(): void {
    this.authService.logIn(this.logInForm.value).subscribe({
      next: response => {
        this.authService.setToken(response.body.access_token);
        this.router.navigateByUrl('/niko')
      },
      error: response => {
        if(response.status === 401) {
          this.unauthorized = true;
          this.errorMessage = "Prenom usuel et/ou mot de passe incorrects...";
        }
        else if(response.status === (406 || 500)) {
          this.unauthorized = true;
          this.errorMessage = response.error.message;
        }
        else {
          this.unauthorized = true;
          this.errorMessage = "Une erreur s'est produit..."
        }
      }
    });
  }
}
