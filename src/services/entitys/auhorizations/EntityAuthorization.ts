import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import type { User } from "../User/EntityUser";
import { AutoUser } from "./EntityAutoUser";

@Entity("autorizacoes")
export class Authorizations {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    authorization!: string;

    @OneToMany("AutoUser", (auto : any) => auto.authorization)
    autorizacoes!: AutoUser[]

}