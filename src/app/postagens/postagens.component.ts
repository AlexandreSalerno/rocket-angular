import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { ComentarioService } from '../service/comentario.service';
import { PostagensService } from '../service/postagens.service';
import { TemaService } from '../service/tema.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.css']
})
export class PostagensComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  videoSeguro: any;
  videoNovo: string

  fotoUser = environment.foto

  comentario: Comentario = new Comentario

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  filtroTema: Tema = new Tema()

  user: User = new User()
  idUser = environment.id

  serie = environment.serie

  key = 'date'
  reverse = true


  constructor(

    public auth: AuthService,
    public router: Router,
    private postagemService: PostagensService,
    private temaService: TemaService,
    private alertas: AlertasService,
    private comentarioService: ComentarioService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    if (environment.token == '') {
      this.router.navigate(['/sobrenos'])
      this.alertas.showAlertLight('Sua sessão expirou, faça o login novamente!')
    }

    this.temaService.refreshToken()
    this.postagemService.refreshToken()
    this.comentarioService.refreshToken()

    if (environment.instrutor == true) {
      this.getAllTemas()
      this.getAllPostagens()
    } else {
      this.getTemaBySerie(this.serie)
      this.findBySeriePostagem(this.serie)
    }
    this.findByIdUser(this.idUser)
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

  findByIdUser(id: number) {
    this.postagemService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = []
      resp.forEach((item) => {
        let video = this.sanitizer.bypassSecurityTrustResourceUrl(item.video)
        item.videoSeguro = video
        this.listaPostagens.push(item)
      })
    })
  }

  getTemaByID(id: number) {
    this.temaService.getById(id).subscribe((resp: Tema) => {
      this.filtroTema = resp
    })
  }

  findPostagensByTemaId(event: any) {
    let number = event.target.value
    if (number == 0) {
      if (environment.instrutor == true) {
        this.getAllPostagens()
      } else {
        this.findBySeriePostagem(this.serie)
      }
    } else {
      this.postagemService.getByTemaId(number).subscribe((resp: Postagem[]) => {
        this.listaPostagens = []
        resp.forEach((item) => {
          let video = this.sanitizer.bypassSecurityTrustResourceUrl(item.video)
          item.videoSeguro = video
          this.listaPostagens.push(item)
        })
      })
    }
  }

  findByTituloPostagem() {
    if (this.tituloPost == '') {
      if (environment.instrutor == true) {
        this.getAllPostagens()
      } else {
        this.findBySeriePostagem(this.serie)
      }
    } else {
      if (environment.instrutor == true) {
        this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
          this.listaPostagens = []
          resp.forEach((item) => {
            let video = this.sanitizer.bypassSecurityTrustResourceUrl(item.video)
            item.videoSeguro = video
            this.listaPostagens.push(item)
          })
        })
      } else {
        this.postagemService.getByTituloAndSeriePostagem(this.tituloPost, this.serie).subscribe((resp: Postagem[]) => {
          this.listaPostagens = []
          resp.forEach((item) => {
            let video = this.sanitizer.bypassSecurityTrustResourceUrl(item.video)
            item.videoSeguro = video
            this.listaPostagens.push(item)
          })
        })
      }
    }
  }

  findBySeriePostagem(serie: number) {
    this.postagemService.getBySerieNumber(serie).subscribe((resp: Postagem[]) => {
      this.listaPostagens = []
      resp.forEach((item) => {
        let video = this.sanitizer.bypassSecurityTrustResourceUrl(item.video)
        item.videoSeguro = video
        this.listaPostagens.push(item)
      })
    })
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.user.serie = this.serie
    this.postagem.usuario = this.user

    this.postagem.video = this.videoNovo

    // this.postagem.comentario = []

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp

      this.alertas.showAlertSuccess('Postagem enviada!')

      this.postagem = new Postagem()
      this.videoNovo = ""
      this.getAllPostagens()
    })
  }

  comentar(id: number) {
    this.user.id = this.idUser
    this.postagem.id = id
    this.comentario.usuario = this.user
    this.comentario.postagens = this.postagem

    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      this.comentario = new Comentario()
      this.postagem = new Postagem()
      if (environment.instrutor == true) {
        this.getAllPostagens()
      } else {
        this.findBySeriePostagem(this.serie)
      }
    })
  }

  videoemebed() {
    this.videoNovo = this.postagem.video.replace("watch?v=", "embed/")
    this.videoSeguro = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoNovo);
  }

  videoSec(vid: string) {
    let nVideo: any
    nVideo = this.sanitizer.bypassSecurityTrustResourceUrl(vid)
    return nVideo
  }
}