import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly artists: string[];

  @IsNotEmpty()
  @IsDateString()
  readonly releasedData: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;
}
