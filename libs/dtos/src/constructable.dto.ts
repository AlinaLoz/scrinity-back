import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';

export class ConstructableDTO<T> {
  constructor(data: T) {
    Object.assign(
      this,
      plainToClass(this.constructor as ClassConstructor<T>, data, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
