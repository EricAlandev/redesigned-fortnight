import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import  { AutoUser } from "./EntityAutoUser";

@Entity("autorizacoes")
export class Authorizations {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column({name: "authorization"})
    authorization!: string;

    @OneToMany(() => require("./EntityAutoUser"), (userNumber : any) => userNumber.authorizationAutoUser)
    authorizations!: AutoUser[];

}