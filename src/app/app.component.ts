import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'threads-app';
  userService = inject(UserService);
  constructor(){
   const user = this.userService.getUserFromStorage();
   if(!user){
    const randomNumber = Math.ceil(Math.random() * 4000 + 1000);
    const randomName = `USER_${randomNumber}`;
    this.userService.createUser(randomName)
      .subscribe((user) => {
        console.log('user created', user);
        this.userService.saveUserToStorage(user);
      })
   }
  }
}
