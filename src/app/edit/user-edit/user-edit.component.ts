import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { User } from 'src/app/model/User';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostagensService } from 'src/app/service/postagens.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  todasPostagens:Postagem[]
  idUser: number
  confirmarSenha: string
  tipoUsuario: boolean
  serie:number

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService,
    private postagemService: PostagensService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/sobrenos'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  findByIdUser(id: number) {
    this.postagemService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.checked
  }

  findAllPostagens(id:number){
    this.postagemService.getByUsuarioId(id).subscribe((resp: Postagem[]) =>{
      this.todasPostagens = resp
    })
  }

  selectSerie(event: any) {
    this.serie = event.target.value
  }

  editar() {
    this.user.instrutor = this.tipoUsuario
    this.user.postagens = this.todasPostagens
    this.user.serie = this.serie
    
    if (this.user.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('Confirme a senha!')
    } else {
      this.authService.editCadastro(this.user).subscribe((resp: User) => {
        this.user = resp
        this.alertas.showAlertSuccess("Conta atualizada com sucesso, faça o login novamente!")

        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/postagens'])

      })
    }

  }

}
