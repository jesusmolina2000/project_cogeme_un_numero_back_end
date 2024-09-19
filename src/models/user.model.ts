import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Raffle } from './raffle.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  correoElectronico: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @OneToMany(() => Raffle, raffle => raffle.usuario)
  rifas: Raffle[];
}
