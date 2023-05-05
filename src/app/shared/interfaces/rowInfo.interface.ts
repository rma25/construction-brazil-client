export interface RowInfo {
  row: any;
  isSaved: boolean;
  isValid: boolean;
  // This is meant for when the user is only deleting row from an array but not the database yet
  // In case they will want to save the "deleted" changes later
  deleteThis?: boolean;
  type?: string;
}
