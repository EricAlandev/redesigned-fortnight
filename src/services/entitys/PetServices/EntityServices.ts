import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import type{ UsuarioServicos } from "../User/EntityUserServices";
import type{ NServicosDataHorario } from "./EntityNServicosData";
import type{ AvaliationServices } from "./EntityAvaliation";
import type{ NComentsUser } from "../coments/EntityNComentsUser";

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

    //users who selected services;
    @OneToMany("UsuarioServicos", (UsuServ : any) => UsuServ.servicos)
    UsuariosDoService!: UsuarioServicos[];

    //data of the service;
    @OneToMany("NServicosDataHorario", (sericDataHorario : any) => sericDataHorario.services)
    ServicesData!: NServicosDataHorario[];

    //avalation of the service
    @OneToOne("AvaliationServices", (av : any) => av.service)
    avaliacao!: AvaliationServices;

    //coments of the service;
    @OneToMany("NComentsUser", (coments : any) => coments.servicos)
    comentsService!: NComentsUser[];
}