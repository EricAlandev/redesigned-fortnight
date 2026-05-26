import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import  type { AutoUser } from "./EntityAutoUser";

@Entity("autorizacoes")
export class Autorizacoess {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column({name: "authorization"})
    authorization!: string;

    @OneToMany("AutoUser", (userNumber : any) => userNumber.authorizationAutoUser)
    authorizations!: AutoUser[];

}