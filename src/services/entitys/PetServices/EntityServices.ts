import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { UsuarioServicos } from "../User/EntityUserServices";
import { NServicosDataHorario } from "./EntityNServicosData";
import { AvaliationServices } from "./EntityAvaliation";

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
    avaliacoes_id!: number;

    //users who selected services;
    @OneToMany("UsuarioServicos", (UsuServ : any) => UsuServ.servicos)
    UsuariosDoService!: UsuarioServicos[];

    //data of the service;
    @OneToMany("NServicosDataHorario", (sericDataHorario : any) => sericDataHorario.services)
    ServicesData!: NServicosDataHorario[];

    //avalation of the user
    @OneToOne("AvaliationServices", (av : any) => av.services)
    @JoinColumn({name: "avaliacoes_id"})
    avaliacao!: AvaliationServices;
}