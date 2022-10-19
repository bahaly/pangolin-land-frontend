import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mimeType } from 'src/app/utils/mime-type.validator';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  errorMessage: string;
  public imagePreview: string;
  roleList: String[] = ['Guerrier', 'Alchimiste', 'Sorcier', 'Espions', 'Enchanteur'];
  specieList: String[] = ['pangolin malais', 'pangolin de Chine', 'pangolin indien', ' pangolin du Cap',
  'pangolin des Philippines', 'pangolin géant', 'pangolin à longue queue'];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private state: StateService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
      role: [null, [Validators.required]],
      address: [null],
      specie: [null],
      image: [null, Validators.required, mimeType]
    });
  }

  onSignup() {
    this.loading = true;
    this.auth.createNewUser(this.signupForm.value,  this.signupForm.get('image').value).then(
      () => {
        this.loading = false;
        this.router.navigate(['/pangolin/all']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = "Désolé une erreur est survenue.";
      }
    );
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.get('image').patchValue(file);
    this.signupForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.signupForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}
