
import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
    type: "postgres", 
    url: process.env.DATABASE_URL, 
    extra: {
        connectionLimit: 10
    },
    synchronize: false,
    logging: false,
    entities: [
        path.join(__dirname, "../services/entitys/**/*.{ts,js}")
    ]
});

export const getDataSource = async() => {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    return AppDataSource
}