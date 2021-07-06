import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar() {
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.serie = this.userLogin.serie
      environment.instrutor = this.userLogin.instrutor
      environment.id = this.userLogin.id

      console.log('ID: '+environment.id)
      console.log('TOKEN:' + environment.token)
      console.log('NOME:' + environment.nome)
      console.log('SERIE:' + environment.serie)
      console.log('FOTO: ' + environment.foto)
      console.log('INSTRUTOR: ' + environment.instrutor)

      this.router.navigate(["/inicio"])
    }, erro => {
      if(erro.status == 500 || 401) {
        alert("Usuário ou senha estão incorretos.")
      }
    })
  }

}
