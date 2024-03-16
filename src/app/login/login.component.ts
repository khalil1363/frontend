import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  err: number = 0; // Define erreur variable
  message:string="login ou mot de passe erronés..";
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next:(data)=>{
        let jwToken=data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error:(err:any)=>{
        this.err=1;
        if (err.error.errorCause=="disabled")
        this.message="l'utilisateur  est désactivé !"
       
      }
    });  
  
  }

  
}
