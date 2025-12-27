import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from './entities/serie.entity';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Serie])],
  providers: [SerieService],
  controllers: [SerieController],
  exports: [SerieService, TypeOrmModule],
})
export class SerieModule {}
