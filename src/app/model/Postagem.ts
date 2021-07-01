import { Tema } from "./Tema"
import { User } from "./User"

export class Postagem {
    public id: number
    public date: Date
    public titulo: string
    public conteudo: string
    public link: string
    public tema: Tema
    public usuario: User
}