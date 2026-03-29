import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import type { User } from "../User/EntityUser";
import { Authorizations } from "./EntityAuthorization";

@Entity("n_autorizacoesUser")
export class AutoUser {
    @PrimaryGeneratedColumn() 
    id!: number;

    @ManyToOne("User", (user : any) => user.authorizations)
    @JoinColumn({name: "usuario_id"})
    user!: User

    @ManyToOne("Authorizations", (auto : any) => auto.authorization)
    @JoinColumn({name: "autorizacoes_id"})
    authorization!: Authorizations

}