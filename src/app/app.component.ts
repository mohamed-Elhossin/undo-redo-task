import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UndoFormComponent } from "./undo-form/undo-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UndoFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'undo_app';
}
