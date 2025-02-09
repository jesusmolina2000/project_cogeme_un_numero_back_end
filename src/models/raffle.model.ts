import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.model';
import { RaffleDate } from './raffle-date.model';
import { ChoosenNumber } from './choosen-number.model';

@Entity()
export class Raffle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.rifas)
  usuario: User;

  @Column({ type: 'varchar', length: 255 })
  premio: string;

  @Column({ type: 'varchar', length: 255 })
  loteria: string;

  @Column({ type: 'date' })
  fechaCreacion: Date;

  @Column({ type: 'date' })
  fechaRifa: Date;

  @Column({ type: 'int' })
  numeroMaximo: number;

  @OneToMany(() => RaffleDate, raffleDate => raffleDate.raffle)
  fechas: RaffleDate[];

  @OneToMany(() => ChoosenNumber, choosenNumber => choosenNumber.raffle)
  numerosEscogidos: ChoosenNumber[];
}
