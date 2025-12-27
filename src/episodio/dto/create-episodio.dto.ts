import { IsString, IsNumber } from 'class-validator';

export class CreateEpisodioDto {
  @IsString()
  titulo: string;

  @IsString()
  duracion: string;

  @IsNumber()
  numeroCapitulo: number;

  @IsNumber()
  serieId: number; 
}
