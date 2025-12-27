import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episodio } from './entities/episodio.entity';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';
import { Serie } from '../serie/entities/serie.entity';

@Injectable()
export class EpisodioService {
  constructor(
    @InjectRepository(Episodio)
    private episodioRepo: Repository<Episodio>,
    @InjectRepository(Serie)
    private serieRepo: Repository<Serie>,
  ) {}

  findAll() {
    return this.episodioRepo.find({ relations: ['serie'] });
  }

  findOne(id: number) {
    return this.episodioRepo.findOne({ where: { id }, relations: ['serie'] });
  }

  async create(dto: CreateEpisodioDto) {
    const serie = await this.serieRepo.findOne({ where: { id: dto.serieId } });
    if (!serie) throw new NotFoundException('Serie no encontrada');

    const episodio = this.episodioRepo.create({ ...dto, serie });
    return this.episodioRepo.save(episodio);
  }

  async update(id: number, dto: UpdateEpisodioDto) {
    const episodio = await this.episodioRepo.preload({ id, ...dto });
    if (!episodio) throw new NotFoundException('Episodio no encontrado');
    return this.episodioRepo.save(episodio);
  }

  async remove(id: number) {
    const episodio = await this.episodioRepo.findOne({ where: { id } });
    if (!episodio) throw new NotFoundException('Episodio no encontrado');
    return this.episodioRepo.remove(episodio);
  }
}
