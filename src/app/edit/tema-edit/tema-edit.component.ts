import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()
  serie:number
  // test:number[] = [ 1, 2, 3, 4, 5]
  test:boolean = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemaService,
    private alertas: AlertasService

  ) { }


  ngOnInit() {

    if (environment.token == '') {
      this.router.navigate(['/sobrenos'])
      this.alertas.showAlertLight('Sua sessão expirou, faça o login novamente!')
    }
    this.temaService.refreshToken()

    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
  }

  findByIdTema(id: number) {
    this.temaService.getById(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  atualizar() {
    this.tema.serie = this.serie
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      this.alertas.showAlertSuccess('Matéria atualizada com sucesso!')
      this.router.navigate(['/tema'])
    })

  }

  numeroSerie(event: any) {
    this.serie = event.target.value
  }

}

  



