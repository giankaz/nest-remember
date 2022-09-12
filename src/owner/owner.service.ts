import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  private database: Owner[] = [{ name: 'kaz', surname: 'rossi', id: 1 }];
  getAllOwners() {
    return this.database;
  }

  getOneOwner(id: number) {
    const owner = this.database.find(
      (dbOwner) => dbOwner.id.toString() === id.toString(),
    );

    if (!owner) {
      //throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
      throw new NotFoundException('Owner not found');
    }

    return owner;
  }

  createNewOwner(owner) {
    const nameExists = this.database.find(
      (dbOwner) => dbOwner.name.toLowerCase() === owner.name.toLowerCase(),
    );

    if (nameExists) {
      throw new BadRequestException('Name already exists.');
    }

    const lastUserId = this.database[this.database.length - 1].id;

    owner.id = lastUserId + 1;

    this.database.push(owner);

    return owner;
  }

  update(id, owner) {
    const ownerIndex = this.database.findIndex(
      (dbOwner) => dbOwner.id.toString() === id.toString(),
    );
    if (!ownerIndex || ownerIndex === -1) {
      throw new NotFoundException('Owner not found');
    }

    const oldOwner = this.database[ownerIndex];

    const updatedOwner = { ...oldOwner, ...owner };

    this.database[ownerIndex] = updatedOwner;

    return updatedOwner;
  }

  delete(id) {
    const ownerIndex = this.database.findIndex(
      (dbOwner) => dbOwner.id.toString() === id.toString(),
    );
    if (!ownerIndex || ownerIndex === -1) {
      throw new NotFoundException('Owner not found');
    }

    this.database[ownerIndex].inactive = true;

    return;
  }
}
