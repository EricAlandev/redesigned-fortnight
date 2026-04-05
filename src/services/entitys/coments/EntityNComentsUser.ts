import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";
import type { User } from "../User/EntityUser";
import type { Coments } from "./EntityComents";

@Entity("n_comentarios_user")
export class NComentsUser {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    usuario_id!: number;

    @Column()
    comentario_id!: number;

    @ManyToOne("User", (user: any) => user.userCOments)
    @JoinColumn({name: 'usuario_id'})
    usuarios!: User

    @ManyToOne("Coments", (coment: any) => coment.comentariosUser)
    @JoinColumn({name: 'comentario_id'})
    comentarios!: Coments
}