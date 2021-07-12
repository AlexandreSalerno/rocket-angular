import { Postagem } from "./Postagem"
import { User } from "./User"

export class Comentario{
    public id:number
    public comentario:string
    public postagens:Postagem
    public usuario:User
    public date: Date
}