import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
//import { Thing } from '../../models/Thing.model';
//import { StuffService } from '../../services/stuff.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PangolinService } from 'src/app/services/pangolin.service';

@Component({
  selector: 'app-one-pangolin',
  templateUrl: './one-pangolin.component.html',
  styleUrls: ['./one-pangolin.component.css']
})
export class OnePangolinComponent implements OnInit, OnDestroy {

  public pangolins: any;
  public loading: boolean;
  public userId: string;
  public part: number;

  private partSub: Subscription;

  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private pangoService: PangolinService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('single-thing');
    this.userId = this.auth.userId;
    this.userId = this.auth.userId ? this.auth.userId : 'userID40282382';
    this.route.params.subscribe(
      (params: Params) => {
        this.pangoService.getPangolinById(params['id']).then(
          (pango: any) => {
            this.loading = false;
            this.pangolins = pango;
          }
        );
      }
    );
  }

  onGoBack() {
    this.router.navigate(['/pangolins']);
  }

  onModify() {
    this.router.navigate(['/pangolin/modify/' + this.pangolins._id]);
  }

  onDelete() {
    this.loading = true;
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }
}
