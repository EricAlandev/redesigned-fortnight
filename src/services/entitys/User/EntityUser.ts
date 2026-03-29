import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import type { UserNumber } from "./EntityUserNumber";
import { AutoUser } from "../auhorizations/EntityAutoUser";
import { UsuarioServicos } from "./EntityUserServices";

@Entity("usuarios")
export class User {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    nome!: string;

    @Column()
    senha!: string;

    @Column()
    token!: string;

    @OneToOne("UserNumber", (numb : any) => numb.user)
    number!: UserNumber

    @OneToOne("EndressUser", (eu : any) => eu.user)
    endress!: UserNumber

    @OneToMany("AutoUser", (auto : any) => auto.user)
    authorizations!: AutoUser[]

    @OneToMany("UsuarioServicos", (UsuServ : any) => UsuServ.usuarios)
    servicosEscolhidos!: UsuarioServicos[];
     
}