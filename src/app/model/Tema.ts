import { Postagem } from "./Postagem"

export class Tema {
    public id: number
    public nome: string
    public serie: number
    public postagens: Postagem[]
}