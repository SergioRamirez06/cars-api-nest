import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuId} from 'uuid'
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {

  private brand: Brand[] = [
    // {
    //   id: uuId(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime()
    // }
  ]
  create(createBrandDto: CreateBrandDto) {

    const newBrand: Brand = {
      id: uuId(),
      name: createBrandDto.name,
      createdAt: new Date().getTime()
    } 

    this.brand.push(newBrand);
    return newBrand
  }

  findAll() {
    return this.brand;
  }

  findOne(id: string) {
    const brand = this.brand.find( car => car.id === id)
    if( !brand ) throw new BadRequestException(`Car with id '${ id }' Not Found`)
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne( id )

    this.brand = this.brand.filter( bran => {

      if( bran.id === id ) {
        bran.updateAt = new Date().getTime(),
        brandDB = { ...brandDB, ...updateBrandDto}
        return brandDB;
      }
      return bran;
    })
  }

  remove(id: string) {
    this.brand = this.brand.filter( bran => bran.id !== id )
  }

    public fillCarsSeedData( brands: Brand[]) {
        this.brand = brands;
    }
}
