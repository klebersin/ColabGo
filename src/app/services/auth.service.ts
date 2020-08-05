import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private google: GooglePlus, private platform: Platform) { }

  loginWithGoogle(){
    return this.google.login({
      webClientId: '448986785671-ptbd7s1pvr2gnc38nutbq9gb2likd2fv.apps.googleusercontent.com',
      offline: true,
      scopes: 'profile email'
    }).then(
      res => {
        const userGoogle = res;
        return this.afAuth.signInWithCredential(auth.GoogleAuthProvider.credential(null, userGoogle.accessToken));
      }
    );
  }
  isAuth() {
    return this.afAuth.authState.pipe(map(aut => aut));
  }
  logoutUser() {
    this.afAuth.signOut();
    if (this.platform.is('cordova')){
      this.google.logout();
    }
  }
}
