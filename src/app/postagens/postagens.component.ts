import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagensService } from '../service/postagens.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.css']
})
export class PostagensComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  filtroTema: Tema = new Tema()

  user: User = new User()
  idUser = environment.id

  serie = environment.serie

  key = 'data'
  reverse = true


  constructor(

    public auth: AuthService,
    public router: Router,
    private postagemService: PostagensService,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/sobrenos'])
      this.alertas.showAlertLight('Sua sessão expirou, faça o login novamente!')
    }

    if (environment.serie == 0) {
      this.getAllTemas()
    } else {
      this.getTemaBySerie(this.serie)
    }
    this.findByIdUser()
    this.getAllPostagens()
    this.temaService.refreshToken()
  }


  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  getTemaBySerie(serie: number) {
    this.temaService.getBySerie(serie).subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getById(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findByIdUser() {
    this.postagemService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  getTemaByID(id: number) {
    this.temaService.getById(id).subscribe((resp: Tema) => {
      this.filtroTema = resp
    })
  }

  getPostagensByTema(event: any) {
    let number = event.target.value
    if (number == 0) {
      this.getAllPostagens()
    } else {
      this.getTemaByID(number)
      this.listaPostagens = this.filtroTema.postagens
      console.log(this.listaPostagens)
    }

  }

  findPostagensByTemaId(event: any) {
    let number = event.target.value
    if (number == 0) {
      this.getAllPostagens()
    } else {
      this.postagemService.getByTemaId(number).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })
    }
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.user.serie = this.serie
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp

      this.alertas.showAlertSuccess('Postagem enviada!')

      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

}
