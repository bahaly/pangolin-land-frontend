import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PangolinService } from 'src/app/services/pangolin.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-pangolin-friend',
  templateUrl: './pangolin-friend.component.html',
  styleUrls: ['./pangolin-friend.component.css'],
})
export class PangolinFriendComponent implements OnInit {
  public pangolins: User[] = [];
  public part: number;
  public loading: boolean;

  private pangolinSub: Subscription;
  private partSub: Subscription;

  constructor(
    private state: StateService,
    private userService: PangolinService,
    private authUser: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');
    this.pangolinSub = this.userService.pango$.subscribe((pango: User[]) => {
      this.pangolins = pango;
      console.log(this.pangolins);

      this.loading = false;
      console.log("subscription");
    });
    this.partSub = this.state.part$.subscribe((part) => {
      this.part = part;
    });
    console.log("ngOnInt");

    this.userService.getPangoFriend(this.authUser.userId);
  }

  deleteFriend(friendId){
    this.userService.deleteFriend(friendId)
  }

  onProductClicked(id: string) {
    //this.router.navigate(['/' + id]);
  }

  ngOnDestroy() {
    this.pangolinSub.unsubscribe();
    this.partSub.unsubscribe();
  }
}
