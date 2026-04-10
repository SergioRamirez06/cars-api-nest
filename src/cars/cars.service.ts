import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuId } from 'uuid'
import { CreateCarDto, UpdateCarDto } from './dtos';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        // {
        //     id: uuId(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // },
    ]

    public findAll() {
        return this.cars;
    }

    public findOneById( id: string ) {

        const car = this.cars.find( c => c.id === id )
        if( !car ) throw new NotFoundException(`Car with id '${ id }' Not Found`)

        return car;
    }

    public create( createCarDto: CreateCarDto ) {

        const newCar = {
            id: uuId(),
            ...createCarDto
        }
        this.cars.push(newCar)

        return newCar;
    }

    public update( id: string, updateCarDto: UpdateCarDto ) {

        let carDb = this.findOneById(id)

        if( updateCarDto.id && updateCarDto.id !== id ) {
            throw new BadRequestException('Card id is not valid inside body')
        }

        this.cars = this.cars.map( car => {

            if ( car.id === id ) {
                carDb = {
                    ...carDb,
                    ...updateCarDto,
                    id,
                }
                return carDb;
            }
            return car;
        })

        return carDb;

    }

    public delete( id: string ) {
        const car = this.findOneById(id)
        this.cars = this.cars.filter( car => car.id !== id)

    }

    public fillCarsSeedData( car: Car[]) {
        this.cars = car;
    }
}
