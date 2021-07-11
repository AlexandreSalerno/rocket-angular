import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagensService } from 'src/app/service/postagens.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagens-edit',
  templateUrl: './postagens-edit.component.html',
  styleUrls: ['./postagens-edit.component.css']
})
export class PostagensEditComponent implements OnInit {

  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private postagemService : PostagensService,
    private temaService : TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
      this.alertas.showAlertLight('Sua sessão expirou, faça o login novamente!')
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()
  }

  findByIdPostagem(id : number){
    this.postagemService.getByIdPostagem(id).subscribe((resp : Postagem) => {
      this.postagem = resp
    })

  }

  
  findByIdTema(){
    this.temaService.getById(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp 
    })

  }

  findAllTemas (){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Sua postagem foi atualizada com sucesso!')
      this.router.navigate(['/postagens'])
    })
  }

}
