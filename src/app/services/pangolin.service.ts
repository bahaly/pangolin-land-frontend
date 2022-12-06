import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PangolinService {
  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;
  private pango: any[] = [];
  public pango$ = new Subject<any[]>();

  constructor(private router: Router, private http: HttpClient, private auth: AuthService) {}

  getPango() {
    this.http.get(environment.api+'user').subscribe(
      (data: any[]) => {
        if (data) {
          this.pango = data;
          this.emitPango();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addPangoFriend(friendId){

    console.log("addddd firndddd");

    const data = {'friendId': friendId, 'userId': this.auth.userId}
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.api+'user/friend', data)
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  editPangoRole(role){
    const id = this.auth.userId;
    const data = {'role': role};
    return new Promise((resolve, reject) => {
      this.http
        .put(environment.api+'user/'+id, data)
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getPangoFriend(id: string) {
    this.http.get(environment.api+'user/friend/'+id).subscribe(
      (data: any[]) => {
        if (data) {
          this.pango = data;
          this.emitPango();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteFriend(friendId){
    const id = this.auth.userId
    this.http.delete(`${environment.api}user/${id}/${friendId}`).subscribe(
      (data: any[]) => {
        if (data) {
          this.getPangoFriend(id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitPango() {
    this.pango$.next(this.pango);
  }

  getPangolinById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api+'user/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  getConnectedPangolin() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.api+'user/' + this.auth.userId).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyPangolin(id: string, pangolin: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put(environment.api+'/user/' + id, pangolin)
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}
