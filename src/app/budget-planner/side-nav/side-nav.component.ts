import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  isSlideOut: boolean = true;
  constructor(private router: Router){}

onProfile() {
  this.router.navigate(['/budget-planner/profile']); 
}
onLogout() {
  this.router.navigate(['/budget-planner/login']); 
}
onHistroy() {
  this.router.navigate(['/budget-planner/history']); 
}
onDash() {
  this.router.navigate(['/budget-planner/dashboard']); 
}
toggleSlideOut() {
this.isSlideOut = !this.isSlideOut
}

}
