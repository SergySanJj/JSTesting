import {Injectable} from '@angular/core';
import {Observable, ObservedValueOf, of as observableOf} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, filter, switchMap} from 'rxjs/operators';
import {auth} from 'firebase';
import {isObjectFlagSet} from 'tslint';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
  }

  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      } else {
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
  }
}
