import { Postagem } from "./Postagem"

export class User {
    public id: number
    public nome: string
    public email: string
    public senha: string
    public foto: string
    public serie: number
    public instrutor: boolean
    public postagens: Postagem[]
}