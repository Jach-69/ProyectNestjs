import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards,} from '@nestjs/common';
import { EpisodioService } from './episodio.service';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('episodios')
export class EpisodioController {
  constructor(private readonly episodioService: EpisodioService) {}

  // GET público
  @Get()
  findAll() {
    return this.episodioService.findAll();
  }

  // GET público por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.episodioService.findOne(id);
  }

  // POST protegido, solo admin
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreateEpisodioDto) {
    return this.episodioService.create(dto);
  }

  // PATCH protegido, solo admin
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEpisodioDto,
  ) {
    return this.episodioService.update(id, dto);
  }

  // DELETE protegido, solo admin
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.episodioService.remove(id);
  }
}
