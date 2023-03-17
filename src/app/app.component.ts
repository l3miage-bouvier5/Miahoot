import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public readonly user: Observable<User | null>;
  public bsIsAuth = new BehaviorSubject<boolean>( false );

  
  constructor(private auth: Auth, private router :Router) {
    this.user = authState(this.auth);
  }

  async login() {
    this.bsIsAuth.next(true);
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      await signInWithPopup(this.auth, googleProvider);
    } catch(err) {
      console.error("On a tué brutalement la fenetre de log...")
    }
    this.bsIsAuth.next(false);
  }

  async logout() {
    return signOut(this.auth);
  }

  toAccountConfig(){
    this.router.navigateByUrl("accountConfig")
  }
}
