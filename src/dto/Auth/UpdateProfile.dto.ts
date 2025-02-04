import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  profilePic: string;
}
