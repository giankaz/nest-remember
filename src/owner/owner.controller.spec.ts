import { Test, TestingModule } from '@nestjs/testing';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';

describe('OwnerController', () => {
  let controller: OwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnerController],
      providers: [OwnerService],
    }).compile();

    controller = module.get<OwnerController>(OwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list all owners', () => {
    const allLists = controller.listAll(OwnerController);

    expect(!!allLists.length).toBe(true);
  });

  it('should list one owner', () => {
    const oneOwner = controller.listOne(1);

    expect(!!oneOwner).toBe(true);
  });
});
