import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Delete, Patch, Query } from '@nestjs/common/decorators';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  listAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return this.ownerService.getAllOwners();
  }

  @Get(':id')
  listOne(@Param('id') id: number) {
    const owner = this.ownerService.getOneOwner(id);
    return owner;
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async create(@Req() request, @Body() createOwnerDto: CreateOwnerDto) {
    const owner = createOwnerDto;

    const newOwner = this.ownerService.createNewOwner(owner);

    return newOwner;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(id, updateOwnerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.ownerService.delete(id);
  }
}
