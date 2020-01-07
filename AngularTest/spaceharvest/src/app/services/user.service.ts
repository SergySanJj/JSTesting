import {Injectable} from '@angular/core';
import {Observable, ObservedValueOf, of as observableOf} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, filter, switchMap} from 'rxjs/operators';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
  }

  private token = sessionStorage.getItem('token');

  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        this.freeToken();
        return null;
      } else {
        this.storeToken(authState.uid);
        return authState.uid;
      }
    })
  );

  isAdmin = this.uid.pipe(
    switchMap(uid => {
      if (!uid) {
        return observableOf(false);
      } else {
        const adminUidRef = this.db.collection('admins').doc(uid);

        return adminUidRef.get().pipe(map(doc => {
          if (!doc.data()) {
            return false;
          } else {
            return doc.data().isAdmin;
          }
        }));
      }
    })
  );


  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    console.log(this.getToken());
    this.freeToken();
  }

  private storeToken(token: string) {
    this.token = token;
    sessionStorage.setItem('token', this.token);
  }

  public getToken(): string {
    return this.token;
  }

  public isLoggedIn(): boolean {
    return !(this.token === '');
  }

  private freeToken() {
    this.token = '';
    sessionStorage.setItem('token', this.token);
  }
}
