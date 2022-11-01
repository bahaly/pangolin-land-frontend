import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditRoleComponent } from '../pangolin/edit-role/edit-role.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public mode: string;
  public part: number;
  public partString: string;
  public isAuth: boolean;

  private modeSub: Subscription;
  private isAuthSub: Subscription;

  constructor(private state: StateService,
              private auth: AuthService,
              private dialogRef: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.modeSub = this.state.mode$.subscribe(
      (mode) => {
        this.mode = mode;
      }
    );

    this.isAuthSub = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/' + this.partString + '/auth/login']);
  }

  changeRole(){
    let dialog = this.dialogRef.open(EditRoleComponent, {
      panelClass: 'contact-form-dialog',
    });
    dialog.afterClosed().subscribe((res) => {
      if(res){
        this._snackBar.open('Role changé avec succès.', 'X');
      }else{
        //this._snackBar.open('Désolé une erreur est survenue.','X');
      }
    })
  }

  onBackToParts() {
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.modeSub.unsubscribe();
    this.isAuthSub.unsubscribe();
  }

}
