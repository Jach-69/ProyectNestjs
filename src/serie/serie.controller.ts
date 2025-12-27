import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('series')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  // GET público
  @Get()
  findAll() {
    return this.serieService.findAll();
  }

  // GET público por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serieService.findOne(id);
  }

  // POST protegido, solo admin
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreateSerieDto) {
    return this.serieService.create(dto);
  }

  // PATCH protegido, solo admin
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSerieDto) {
    return this.serieService.update(id, dto);
  }

  // DELETE protegido, solo admin
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serieService.remove(id);
  }
}
