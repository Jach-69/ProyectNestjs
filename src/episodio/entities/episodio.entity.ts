import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Serie } from '../../serie/entities/serie.entity';

@Entity()
export class Episodio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  duracion: string;

  @Column()
  numeroCapitulo: number;

  @ManyToOne(() => Serie, (serie) => serie.episodios, { onDelete: 'CASCADE' })
  serie: Serie;
}
