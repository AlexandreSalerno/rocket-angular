import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTema: Tema[]
  serie: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if (environment.token == "") {
      this.router.navigate(["/entrar"])
      this.alertas.showAlertLight('Sua sessão expirou, faça o login novamente!')
    }

    this.temaService.refreshToken()
    this.findAllTema()
  }

  cadastrar() {
    this.tema.serie = this.serie
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      this.alertas.showAlertSuccess("Matéria cadastrada com sucesso!")
      this.findAllTema()
      this.tema = new Tema()
    })
  }

  findAllTema() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTema = resp
    })
  }

  numeroSerie(event: any) {
    this.serie = event.target.value
  }

}
