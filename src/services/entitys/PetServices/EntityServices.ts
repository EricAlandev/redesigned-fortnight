import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { UsuarioServicos } from "../User/EntityUserServices";
import { NServicosDataHorario } from "./EntityNServicosData";
import { AvaliationServices } from "./EntityAvaliation";
import { NComentsUser } from "../coments/EntityNComentsUser";

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
    @OneToMany(() => UsuarioServicos, (UsuServ : any) => UsuServ.servicos)
    UsuariosDoService!: UsuarioServicos[];

    //data of the service;
    @OneToMany(() => NServicosDataHorario, (sericDataHorario : any) => sericDataHorario.services)
    ServicesData!: NServicosDataHorario[];

    //avalation of the service
    @OneToOne(() => AvaliationServices, (av : any) => av.service)
    avaliacao!: AvaliationServices;

    //coments of the service;
    @OneToMany(() => NComentsUser, (coments : any) => coments.servicos)
    comentsService!: NComentsUser[];
}