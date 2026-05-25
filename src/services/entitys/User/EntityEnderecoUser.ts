import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import  { User } from "./EntityUser";


@Entity("endereco_user")
export class EndressUser {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    endereco!: string;

    @Column()
    numero_casa!: string;

    @OneToOne(() => User, (user : any) => user.endress)
    @JoinColumn({name: "usuario_id"})
    user!: User

}