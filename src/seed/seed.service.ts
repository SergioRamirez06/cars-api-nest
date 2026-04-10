import { Injectable } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';
import { BRANDS_SEED } from './data/brands.seed';
import { CARS_SEED } from './data/cars-seed';
import { BrandsService } from 'src/brands/brands.service';


@Injectable()
export class SeedService {

  constructor(
    private readonly carsService: CarsService,
    private readonly brandService: BrandsService
  ) {}

  populateDB() {
    this.brandService.fillCarsSeedData( BRANDS_SEED );
    this.carsService.fillCarsSeedData( CARS_SEED );
    return 'SEED EXCUTE'
  }
}
