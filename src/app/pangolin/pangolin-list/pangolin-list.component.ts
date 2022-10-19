import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
//import { StuffService } from '../../services/stuff.service';
import { Subscription } from 'rxjs';
//import { Thing } from '../../models/Thing.model';
import { Router } from '@angular/router';
import { PangolinService } from 'src/app/services/pangolin.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-pangolin-list',
  templateUrl: './pangolin-list.component.html',
  styleUrls: ['./pangolin-list.component.css'],
})
export class PangolinListComponent implements OnInit, AfterViewInit, OnDestroy {
  public pangolins: any[] = [];
  public part: number;
  public loading: boolean;
  public userId: string;
  public CurrentUser: User;
  private pangolinSub: Subscription;
  private partSub: Subscription;
  public friendList : string[] = [];

  constructor(
    private state: StateService,
    private userService: PangolinService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}


  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');
    this.pangolinSub = this.userService.pango$.subscribe((pango) => {
      this.pangolins = pango;
      this.loading = false;
    });
    this.partSub = this.state.part$.subscribe((part) => {
      this.part = part;
    });
    this.userId = this.authService.userId
    this.userService.getPango();
  }

  ngAfterViewInit() {
    this.userService.getConnectedPangolin().then(
      (res:User) => {
        this.CurrentUser = res
        this.CurrentUser.friends.forEach((res) => this.friendList.push(res.friendId))
        console.log(this.friendList);
      }
    )
  }

  onProductClicked(id: string) {
    this.router.navigate(['/pangolin/' + id]);
  }

  addFriend(_id : string){
    this.userService.addPangoFriend(_id).then(
      (res) => this._snackBar.open("Youpi vous avez un nouvelle ami(e).","X",{verticalPosition: 'top'})
    ).catch(res =>  this._snackBar.open("Désolé une erreur est survenue.","X",{verticalPosition: 'top'}))
  }

  ngOnDestroy() {
    this.pangolinSub.unsubscribe();
    this.partSub.unsubscribe();
  }
}
