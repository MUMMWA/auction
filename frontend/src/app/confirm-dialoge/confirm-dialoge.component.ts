import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-confirm-dialoge',
  templateUrl: './confirm-dialoge.component.html',
  styles: []
})
export class ConfirmDialogeComponent implements OnInit {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {

    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}
export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}
