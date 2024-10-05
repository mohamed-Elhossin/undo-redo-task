import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-undo-form',
  standalone: true,

  templateUrl: './undo-form.component.html',
  styleUrl: './undo-form.component.css',
  imports: [ReactiveFormsModule]
})
export class UndoFormComponent {

  message = "";
  // Define the FormGroup with validators
  myForm = new FormGroup({
    name: new FormControl<string | null>("", Validators.required),
    email: new FormControl<string | null>("", [Validators.required, Validators.email]),
    age: new FormControl<number | null>(0, Validators.required),

  });

  undoStatus = true;
 redoStatus = true;
  // Type the array correctly to store the values from myForm
  undoArray: Array<{ name: string | null, email: string | null, age: number | null }> = [];
  // New redoArray to store removed items from undoArray
  redoArray: Array<{ name: string | null, email: string | null, age: number | null }> = [];

  constructor() { }

  // Save form values to undoArray when called
  saveValuesInArray() {
    if (this.myForm.valid) {
      // Push form values into the array
      this.undoArray.push(this.myForm.value as {
        name: string | null;
        email: string | null;
        age: number | null;

      });
      console.log("Form Values:", this.myForm.value);
      console.log("Updated undoArray:", this.undoArray);
      this.myForm.reset();
      this.message = "";
      this.undoStatus = false;
    } else {
      this.message = "Form is not valid";

    }
  }

  restoreAndRemoveLastObject() {
    if (this.undoArray.length > 0) {
      // Remove the last object from the array and get its value
      const lastObject = this.undoArray.pop();

      if (lastObject) {
        this.redoArray.push(lastObject);
        // Update form controls with the values from the last object
        this.myForm.patchValue({
          name: lastObject.name,
          email: lastObject.email,
          age: lastObject.age,

        });

        console.log("Restored and removed last object:", lastObject);
        console.log("Updated undoArray after removal:", this.undoArray);
        console.log("Updated redoArray after adding the removed object:", this.redoArray);
      }
      this.redoStatus = false;
    } else {
      if (this.undoArray.length == 0) {
        this.myForm.reset();
      }
      this.message = "No values in undoArray to restore.";
      this.undoStatus = true;
      console.log("Updated redoArray after adding the removed object:", this.redoArray);
    }
  }

  restoreAndRemoveLastObjectInRendo() {
    if (this.redoArray.length > 0) {
      // Remove the last object from the array and get its value
      const lastObject = this.redoArray.pop();

      if (lastObject) {
        this.redoArray.push(lastObject);


        // Update form controls with the values from the last object
        this.myForm.patchValue({
          name: lastObject.name,
          email: lastObject.email,
          age: lastObject.age,

        });
        const index = this.redoArray.indexOf(lastObject);
        if (index > -1) {
          this.redoArray.splice(index, 1); // Remove it
        }
        console.log("Restored and removed last object:", lastObject);
        console.log("Updated undoArray after removal:", this.undoArray);
        console.log("Updated redoArray after adding the removed object:", this.redoArray);
      }
    } else {
      if (this.redoArray.length == 0) {
        this.myForm.reset();
      }
      this.message = "No values in Redo to restore.";
      this.redoStatus = true;
      console.log("Updated redoArray after adding the removed object:", this.redoArray);
    }
  }



}
