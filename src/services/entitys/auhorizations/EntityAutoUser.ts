import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import type { User } from "../User/EntityUser";
import { Authorizations } from "./EntityAuthorization";

@Entity("n_autorizacoesUser")
export class AutoUser {
    @PrimaryGeneratedColumn() 
    id!: number;

   // Replace the arrow function targets with pure strings
    @ManyToOne("User", "authorizations")
    @JoinColumn({ name: "usuario_id" })
    user!: User;

    @ManyToOne("Authorizations", "autorizacoes")
    @JoinColumn({ name: "autorizacoes_id" })
    authorization!: Authorizations;

}