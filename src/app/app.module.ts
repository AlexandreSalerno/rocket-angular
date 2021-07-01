import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { EquipeComponent } from './equipe/equipe.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SobrenosComponent } from './sobrenos/sobrenos.component';
import { InicioComponent } from './inicio/inicio.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    EquipeComponent,
    NavbarComponent,
    SobrenosComponent,
    InicioComponent,
    EntrarComponent,
    CadastrarComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
