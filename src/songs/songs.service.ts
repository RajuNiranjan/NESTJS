import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly Songs = [];

  create(song) {
    this.Songs.push(song);
    return this.Songs;
  }

  findAll() {
    throw new Error('error in db while fetching data');
    return this.Songs;
  }
}
