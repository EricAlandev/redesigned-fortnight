import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";
import type{ User } from "./EntityUser";
import { Services } from "../PetServices/EntityServices";
import { NServicosDataHorario } from "../PetServices/EntityNServicosData";

@Entity("usuarios_servicos")
export class UsuarioServicos {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column()
    usuario_id!: number;

    @Column()
    servicos_id!: number;

    @Column()
    servicos_data_horario_id!: number;

    @Column()
    comentado!: boolean;

    @ManyToOne("User", (user: any) => user.servicosEscolhidos)
    @JoinColumn({name: "usuario_id"})
    usuarios!: User

    @ManyToOne("Services", (user: any) => user.UsuariosDoService)
    @JoinColumn({name: "servicos_id"})
    servicos!: Services

    @ManyToOne("NServicosDataHorario", (servicosData: any) => servicosData.usuarioServices)
    @JoinColumn({name: "servicos_data_horario_id"})
    NServicosData!: NServicosDataHorario
}