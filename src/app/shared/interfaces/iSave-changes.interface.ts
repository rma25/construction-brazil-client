import { Observable } from 'rxjs';

export interface ISaveChanges {
  areThereUnsavedChanges(): boolean;
  saveChanges(): Observable<boolean[]>;
}
