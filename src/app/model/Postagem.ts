import { Comentario } from "./Comentario"
import { Tema } from "./Tema"
import { User } from "./User"

export class Postagem {
    public id: number
    public date: Date
    public titulo: string
    public conteudo: string
    public imagem: string
    public video: string
    public tema: Tema
    public usuario: User
    public comentario: Comentario[]
    public videoSeguro: any
}