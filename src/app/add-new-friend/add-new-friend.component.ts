import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { mimeType } from 'src/app/utils/mime-type.validator';
import { AuthService } from '../services/auth.service';
import { PangolinService } from '../services/pangolin.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-add-new-friend',
  templateUrl: './add-new-friend.component.html',
  styleUrls: ['./add-new-friend.component.css'],
})
export class AddNewFriendComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  errorMessage: string;
  public imagePreview: string;
  roleList: String[] = [
    'Guerrier',
    'Alchimiste',
    'Sorcier',
    'Espions',
    'Enchanteur',
  ];
  specieList: String[] = [
    'pangolin malais',
    'pangolin de Chine',
    'pangolin indien',
    ' pangolin du Cap',
    'pangolin des Philippines',
    'pangolin géant',
    'pangolin à longue queue',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: PangolinService,
    private _snackBar: MatSnackBar,
    private auth: AuthService,
    private state: StateService
  ) {}

  ngOnInit() {
    this.state.mode$.next('form');
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
      role: [null, [Validators.required]],
      address: [null],
      specie: [null],
      image: [null, Validators.required, mimeType],
    });
  }

  onSignup() {
    this.loading = true;
    this.auth
      .createFriend(this.signupForm.value, this.signupForm.get('image').value)
      .then((res: any) => {
        this.loading = false;
        this.addFriend(res.data._id)
      })
      .catch((error) => {
        console.log(error);

        this.loading = false;
        this.errorMessage = 'Désolé une erreur est survenue.';
      });
  }

  addFriend(_id: string) {

    this.userService
      .addPangoFriend(_id)
      .then((res) =>{
          this._snackBar.open('Youpi vous avez un nouvelle ami(e).', 'X', {
            verticalPosition: 'top',
          })
          this.router.navigate(['/pangolin/all']);
        }
      )
      .catch((res) =>
        this._snackBar.open('Désolé une erreur est survenue.', 'X', {
          verticalPosition: 'top',
        })
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
