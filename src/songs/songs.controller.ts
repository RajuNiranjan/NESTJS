import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/creat-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @Post()
  create(@Body() createSong: CreateSongDto) {
    return this.songService.create(createSong);
  }

  @Get()
  findAll() {
    try {
      return this.songService.findAll();
    } catch (error) {
      throw new HttpException(
        'internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  findOne() {
    return 'fetch song by id';
  }

  @Patch(':id')
  update() {
    return 'update song by id';
  }
}
