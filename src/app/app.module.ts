import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { HashLocationStrategy } from '@angular/common';
import { LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { EquipeComponent } from './equipe/equipe.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SobrenosComponent } from './sobrenos/sobrenos.component';
import { InicioComponent } from './inicio/inicio.component';
import { EntrarComponent } from './entrar/entrar.component';
import { PostagensComponent } from './postagens/postagens.component';
import { NavbarLandingComponent } from './navbar-landing/navbar-landing.component';
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
    PostagensComponent,
    NavbarLandingComponent,
    CadastrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
