import {
  IsString,
  IsOptional,
  Max,
  IsNumber,
  ArrayNotContains,
} from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly surname: string;

  @IsString({ each: true })
  @IsOptional()
  @ArrayNotContains(['sanduiche', 'salada'])
  readonly projects?: string[];

  @IsNumber()
  @IsOptional()
  @Max(40)
  readonly number?: number;
}
