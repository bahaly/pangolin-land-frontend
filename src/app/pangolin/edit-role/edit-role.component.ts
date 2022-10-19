import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { PangolinService } from 'src/app/services/pangolin.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
})
export class EditRoleComponent implements OnInit {
  roleForm: FormGroup;
  loading = false;
  pangolin: User;
  role;
  errorMessage: string;
  roleList: String[] = [
    'Guerrier',
    'Alchimiste',
    'Sorcier',
    'Espions',
    'Enchanteur',
  ];

  constructor(
    public matDialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    private pangolinService: PangolinService
  ) {
    this.pangolinService.getConnectedPangolin().then((res: User) => {
      console.log(res);
      this.pangolin = res;
      this.role = res.role;
    });
  }

  ngOnInit(): void {

    this.roleForm = this.formBuilder.group({
      role: [this.role, [Validators.required]],
    });
  }

  onSubmit() {
    this.pangolinService.editPangoRole(this.roleForm.value.role).then(
       (res) => {
        this.matDialogRef.close(true);
      },
    ).catch(
      (err) => this.matDialogRef.close(false)
    )  ;
  }
}
