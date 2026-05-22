import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import  { AutoUser } from "./EntityAutoUser";

@Entity("autorizacoes")
export class Authorizations {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column({name: "authorization"})
    authorization!: string;

    @OneToMany(() => AutoUser, (userNumber : any) => userNumber.user)
    authorizations!: AutoUser[];

}