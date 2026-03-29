import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import type { Cart } from "../cart/EntityCart";
import { UsuarioServicos } from "../User/EntityUserServices";
import { NServicosDataHorario } from "./EntityNServicosData";

@Entity("servicos")
export class Services {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    nome_servico!: string;

    @Column()
    preco!: number;

    @Column()
    preco_desconto!: string;

    @Column()
    descricao!: string;

    @Column()
    escolhido!: boolean;

    @OneToMany("Cart", (cart : any) => cart.sevices)
    cartServices!: Cart[];

    //users who selected services;
    @OneToMany("UsuarioServicos", (UsuServ : any) => UsuServ.servicos)
    UsuariosDoService!: UsuarioServicos[];

    //data of the service;
    @OneToMany("NServicosDataHorario", (sericDataHorario : any) => sericDataHorario.services)
    ServicesData!: NServicosDataHorario[];
}