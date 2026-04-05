import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";

@Entity("comentarios")
export class Coments {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    comentario!: string;

    @OneToMany("NComentsUser", (coment: any) => coment.comentarios)
    comentariosUser!: Coments
}