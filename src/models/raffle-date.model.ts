import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Raffle } from './raffle.model';

@Entity()
export class RaffleDate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Raffle, raffle => raffle.fechas)
  raffle: Raffle;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'enum', enum: ['actual', 'pasada', 'aplazada'] })
  estado: 'actual' | 'pasada' | 'aplazada';
}
