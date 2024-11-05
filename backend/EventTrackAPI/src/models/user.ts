import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })  // Asegura que los emails sean únicos
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true, type: "int" })  // Usa `type` para indicar el tipo en la BD
  age?: number;

  @Column({ nullable: true })
  sex?: string;

  @Column({ nullable: true })
  job_position?: string;

  @Column({ nullable: true })
  company?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })  // Establece un valor por defecto
  date_registered?: Date;
}


