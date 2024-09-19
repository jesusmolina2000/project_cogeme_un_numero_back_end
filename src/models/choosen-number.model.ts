import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Raffle } from './raffle.model';

@Entity()
export class ChoosenNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  numero: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 20 })
  numeroDeContacto: string;

  @ManyToOne(() => Raffle, raffle => raffle.numerosEscogidos)
  raffle: Raffle;

  @Column({ type: 'enum', enum: ['pendiente', 'aceptado', 'rechazado'], default: 'pendiente' })
  estado: 'pendiente' | 'aceptado' | 'rechazado';
}
