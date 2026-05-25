import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { DataService } from "./EntityDataService";
import { UsuarioServicos } from "../User/EntityUserServices";
import { Services } from "./EntityServices";

@Entity("n_servicos_data_horario")
export class NServicosDataHorario {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    servicos_id!: number;

    @Column()
    data_horario_id!: number;

    @Column()
    choosed!: boolean;

    @ManyToOne(() => Services, (s: any) => s.ServicesData)
    @JoinColumn({name: "servicos_id"})
    services!: Services

    @ManyToOne(() => DataService, (data: any) => data.relationDataService)
    @JoinColumn({name: "data_horario_id"})
    DataService!: DataService

    //array of the UserServices - maked to be possible to pick the data with the userServices
    @OneToMany(() => UsuarioServicos, (service: any) => service.NServicosData)
    usuarioServices!: UsuarioServicos[]
}