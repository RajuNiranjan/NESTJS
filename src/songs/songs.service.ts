import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly Songs = [];

  create(song) {
    this.Songs.push(song);
    return this.Songs;
  }

  findAll() {
    return this.Songs;
  }
}
