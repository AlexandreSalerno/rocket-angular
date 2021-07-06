import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nome:string=environment.nome
  foto:string=environment.foto

  isInstruitor:boolean = environment.instrutor

  constructor(
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0)

  }

  sair() {
    this.router.navigate(["/sobrenos"])
    environment.id=0
    environment.nome=''
    environment.token=''
    environment.foto=''
    environment.instrutor=false
  }

}
