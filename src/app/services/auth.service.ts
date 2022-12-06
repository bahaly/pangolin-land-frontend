import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;

  constructor(private router: Router, private http: HttpClient) {}

  createNewUser(userData, image) {
    return new Promise<void>((resolve, reject) => {
      const userFormData = new FormData();
      userFormData.append('user', JSON.stringify(userData));
      userFormData.append('image', image, userData.name);
      this.http.post(environment.api + 'auth/signup', userFormData).subscribe(
        () => {
          this.login(userData.email, userData.password)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  createFriend(userData, image) {
    return new Promise<void>((resolve, reject) => {
      const userFormData = new FormData();
      userFormData.append('user', JSON.stringify(userData));
      userFormData.append('image', image, userData.name);
      this.http.post(environment.api + 'auth/signup', userFormData).subscribe(
        (res: any) => {
          //console.log(res);
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getUser(id): Observable<any> {
    return this.http.get<any>(`${environment.api}users/${id}/`);
  }

  login(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(environment.api + 'auth/login', {
          email: email,
          password: password,
        })
        .subscribe(
          (authData: { token: string; userId: string }) => {
            this.token = authData.token;
            this.userId = authData.userId;
            this.isAuth$.next(true);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logout() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }
}
