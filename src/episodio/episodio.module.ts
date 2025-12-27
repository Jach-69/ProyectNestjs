import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episodio } from './entities/episodio.entity';
import { EpisodioService } from './episodio.service';
import { EpisodioController } from './episodio.controller';
import { SerieModule } from '../serie/serie.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Episodio]), 
    SerieModule 
  ],
  providers: [EpisodioService],
  controllers: [EpisodioController],
})
export class EpisodioModule {}
