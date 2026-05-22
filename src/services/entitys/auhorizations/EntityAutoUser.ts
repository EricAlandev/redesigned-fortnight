import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { User } from "../User/EntityUser";
import { Authorizations } from "./EntityAuthorization";

@Entity("n_autorizacoesuser")
export class AutoUser {
    @PrimaryGeneratedColumn() 
    id!: number;

   // Replace the arrow function targets with pure strings
    @ManyToOne(() => User, (user: any) => user.authorizations)
    @JoinColumn({ name: "usuario_id" })
    user!: User;

    @ManyToOne(() => Authorizations, (auto: any) => auto.authorizations)
    @JoinColumn({ name: "autorizacoes_id" })
    authorizationAutoUser!: Authorizations;
}