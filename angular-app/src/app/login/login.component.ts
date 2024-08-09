import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { URLs } from '../../utills/urls';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) { }

  [key: string]: any; 
  username: string = "";
  password: string = "";

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(['/contacts']);
    }
  }


  valueChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    console.log(name);
    this[name] = value;
  }
  

  onSubmit(): void {
    if(!this.username || !this.password){
      alert("Username or Password Field cannot be empty");
    }
    
    const data = {
      username: this.username,
      password: this.password
    };
    fetch(URLs.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => 
      response.json()
    ).then(response => {
        // console.log('====================================');
        // console.log(response);
        // console.log('====================================');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/contacts']);
      
    }).catch(error => {
      console.log(error);
    });
  }
}
