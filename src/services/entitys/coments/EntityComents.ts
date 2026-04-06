import { Min, Max } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import type { NComentsUser } from "./EntityNComentsUser";
@Entity("comentarios")
export class Coments {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    comentario!: string;

    @Column("decimal", { precision: 3, scale: 2})
    @Min(0)
    @Max(5)
    avaliacao!: number;

    @OneToMany("NComentsUser", (coment: any) => coment.comentarios)
    comentariosUser!: NComentsUser[]
}