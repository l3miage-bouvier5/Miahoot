import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInAnonymously, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { EMPTY, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccueilComponent {
  
}
