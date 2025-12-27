import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from './entities/serie.entity';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(Serie)
    private serieRepo: Repository<Serie>,
  ) {}

  findAll() {
    return this.serieRepo.find({ relations: ['episodios'] });
  }

  findOne(id: number) {
    return this.serieRepo.findOne({ where: { id }, relations: ['episodios'] });
  }

  create(dto: CreateSerieDto) {
    const serie = this.serieRepo.create(dto);
    return this.serieRepo.save(serie);
  }

  async update(id: number, dto: UpdateSerieDto) {
    const serie = await this.serieRepo.preload({ id, ...dto });
    if (!serie) throw new NotFoundException('Serie no encontrada');
    return this.serieRepo.save(serie);
  }

  async remove(id: number) {
    const serie = await this.serieRepo.findOne({ where: { id } });
    if (!serie) throw new NotFoundException('Serie no encontrada');
    return this.serieRepo.remove(serie);
  }
}
