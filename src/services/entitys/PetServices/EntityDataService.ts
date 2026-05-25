import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import type{ NServicosDataHorario } from "./EntityNServicosData";

@Entity("data_horario")
export class DataService {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dia_horario!: Date;

    @OneToMany("NServicosDataHorario", (dataHorario: any) => dataHorario.DataService)
    relationDataService!: NServicosDataHorario[]
}