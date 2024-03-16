
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/User';
import { environment } from '../envirenment/envirenment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedUser: string = '';
  public isloggedIn: boolean = false;
  public roles: string[] = [];
  private apiUrl = environment.apiUrl;
  token!:string;
  private helper =new JwtHelperService();
  public regitredUser:User=new User();
  constructor(private router: Router,private http:HttpClient) { }

  login(user:User){
    return this.http.post<User>(this.apiUrl+'/login',user,{observe:'response'});
  }
  saveToken(jwt:string){
    localStorage.setItem('jwt',jwt);
    this.token=jwt;
    this.isloggedIn=true;
    this.decodeJWT();
  }
  loadToken(){
    this.token=localStorage.getItem('jwt')!;
    this.decodeJWT();
  }
  decodeJWT(){
    if(this.token==undefined)
    return;
    const decodedToken=this.helper.decodeToken(this.token);
    this.roles=decodedToken.roles;
    console.log("roles"+this.roles);
    this.loggedUser=decodedToken.sub;
  }
  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token=undefined!;
   localStorage.removeItem("jwt");
    this.router.navigate(['/login']);
  }
  isTokenExpired():Boolean{
    return this.helper.isTokenExpired(this.token);
  }
  getToken():string{
    return this.token;
  }
  isAdmin():Boolean{
    if(!this.roles)
    return false;
    return this.roles.indexOf('ADMIN')>=0;
  }
  setLoggedUserFromLocalStorage(login:string){
    this.loggedUser = login;
    this.isloggedIn=true;
  }
registerUser(user :User){
  return this.http.post<User>(this.apiUrl+'/register',user,{observe:'response'});
}

setRegistredUser(user:User){
this.regitredUser=user;
}
getRegistredUser(){
  return this.regitredUser;
}
validateEmail(code:string){
  return this.http.get<User>(this.apiUrl+'/verifyEmail/'+code);
}
}