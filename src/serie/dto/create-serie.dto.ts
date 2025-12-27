import { IsString } from 'class-validator';

export class CreateSerieDto {
  @IsString()
  titulo: string;

  @IsString()
  genero: string;

  @IsString()
  sinopsis: string;

  @IsString()
  urlPortada: string;
}
