import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Episodio } from '../../episodio/entities/episodio.entity';

@Entity()
export class Serie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  genero: string;

  @Column()
  sinopsis: string;

  @Column()
  urlPortada: string;

  @OneToMany(() => Episodio, (episodio) => episodio.serie, { cascade: true })
  episodios: Episodio[];
}
