import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { PostagensDeletComponent } from './delet/postagens-delet/postagens-delet.component';
import { TemaDeletComponent } from './delet/tema-delet/tema-delet.component';
import { PostagensEditComponent } from './edit/postagens-edit/postagens-edit.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { PostagensComponent } from './postagens/postagens.component';
import { SobrenosComponent } from './sobrenos/sobrenos.component';
import { TemaComponent } from './tema/tema.component';

 

const routes: Routes = [
  {path:'',redirectTo:'sobrenos', pathMatch:'full'},

  {path:'entrar',component: EntrarComponent},

  {path:'cadastrar',component: CadastrarComponent},

  {path:'inicio',component: InicioComponent},

  {path:'sobrenos',component: SobrenosComponent},

  {path:'tema', component: TemaComponent},

  {path:'tema-edit/:id', component: TemaEditComponent},

  {path:'tema-delet/:id', component: TemaDeletComponent},

  {path:'postagens', component: PostagensComponent},

  {path: 'postagens-edit/:id', component: PostagensEditComponent},

  {path: 'postagens-delet/:id', component: PostagensDeletComponent},

  {path: 'user-edit/:id', component: UserEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
