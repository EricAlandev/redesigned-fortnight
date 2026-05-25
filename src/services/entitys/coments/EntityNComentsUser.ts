import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";
import  { User } from "../User/EntityUser";
import  { Coments } from "./EntityComents";
import  { Services } from "../PetServices/EntityServices";

@Entity("n_comentarios_user")
export class NComentsUser {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    usuario_id!: number;

    @Column()
    comentario_id!: number;

    @Column()
    servicos_id!: number;

    @ManyToOne(() => User, (user: any) => user.userCOments)
    @JoinColumn({name: 'usuario_id'})
    usuarios!: User

    @ManyToOne(() => Coments, (coment: any) => coment.comentariosUser)
    @JoinColumn({name: 'comentario_id'})
    comentarios!: Coments

    @ManyToOne(() => Services, (serv: any) => serv.comentsService)
    @JoinColumn({name: 'servicos_id'})
    servicos!: Services
}