import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

import { User } from '../models/user.model'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user;
  error: String;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onRegister(form: NgForm){
    if(form.value.password != form.value.confirmpassword){
      this.error = "Password do not match";
    } else {
      // Creating user object
      this.user = {
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        username: form.value.username,
        password: form.value.password
      };

      // Calling register service
      this.userService.registerUser(this.user)
      .subscribe( data => {
        console.log(data);
      });
    }
  }
}
