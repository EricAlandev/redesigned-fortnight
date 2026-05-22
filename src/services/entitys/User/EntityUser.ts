import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import type { UserNumber } from "./EntityUserNumber";
import type { AutoUser } from "../auhorizations/EntityAutoUser";
import type { UsuarioServicos } from "./EntityUserServices";
import type { NComentsUser } from "../coments/EntityNComentsUser";

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

    // Replace (auto) => auto.user with a string literal pointing to the property name
    @OneToMany("AutoUser", "user")
    authorizations!: AutoUser[];

    @OneToMany("UsuarioServicos", (UsuServ : any) => UsuServ.usuarios)
    servicosEscolhidos!: UsuarioServicos[];

    @OneToMany("NComentsUser", (coments : any) => coments.usuarios)
    userCOments!: NComentsUser[]
}