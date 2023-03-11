import { Injectable } from '@angular/core';
import { Auth, authState, user } from '@angular/fire/auth';
import { docData, Firestore, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
import { collection, doc, DocumentReference, getDoc, setDoc } from '@firebase/firestore';
import { map, Observable, of, switchMap } from 'rxjs';


export interface MiahootUser{
  readonly name: string
  readonly photoUrl : string
}

const conv : FirestoreDataConverter<MiahootUser> = {
  toFirestore : val => val,
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ):MiahootUser{
    const data = snapshot.data(options)!;
    
    return {
      name : data['name'],
      photoUrl: data['photoUrl']
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  obsMiahootUser : Observable<MiahootUser|undefined>;

  constructor(private auth: Auth, private fs : Firestore) { 
    this.obsMiahootUser = authState(this.auth).pipe(
      switchMap((user) => {
        if(user){
          const userRef = doc(this.fs , `users/${user.uid}`).withConverter(conv)
          const userData$ = docData(userRef)
          var docSnapshot = await getDoc(userRef)
          if(!docSnapshot.exists()){
            await setDoc(userRef,{
              name: user.displayName,
              photoUrl: user.photoURL
            })
          }
          return userData$
        }else{
          of(undefined)
        }
      })
    )
  }
}
   
   
    //   switchMap(user => {
    //     if (user) {
    //       const userRef = doc(this.fs,`users/${user.uid}`).withConverter(conv);
    //       const userData$: Observable<MiahootUser> = docData(userRef);
    //       const createUserData$ = async (): Promise<MiahootUser|undefined> => {
    //         const docSnapshot = await getDoc(userRef);
    //         if (!docSnapshot.exists()) {
    //           setDoc(userRef,{name:user.displayName, photoUrl:user.photoURL)
    //         } else {
    //           return userData$
    //           };
             
    //         }
    //       };
    //       // Combiner les observables userData$ et createUserData$ en un seul observable
    //     } else {
    //       return of(undefined);
    //     }
    //   }
    // );
  }
}
