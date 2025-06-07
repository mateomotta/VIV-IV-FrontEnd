import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar";
import { FooterComponent } from './components/footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected title = 'viv-iv';
}
