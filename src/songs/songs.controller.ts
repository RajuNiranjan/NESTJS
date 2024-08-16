import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
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
    return this.songService.findAll();
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
