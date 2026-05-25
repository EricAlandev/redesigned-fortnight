import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import  type { User } from "./EntityUser";


@Entity("usuario_numero")
export class UserNumber {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    dd!: string;

    @Column()
    numero!: string;

    @OneToOne("User", (user : any) => user.number)
    @JoinColumn({name: "usuario_id"})
    user!: User

}