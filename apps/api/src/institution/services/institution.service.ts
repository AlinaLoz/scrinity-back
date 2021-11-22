import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Institution } from '@libs/entities';
import { NotFoundError } from '@libs/exceptions/errors';
import { ERRORS } from '@libs/constants';

@Injectable()
export class InstitutionService {
  @InjectRepository(Institution) private readonly institutionRepository: Repository<Institution>;

  async getInstitutionById(id: number): Promise<Institution> {
    return await this.getInstitutionOrFail(id);
  }

  private async getInstitutionOrFail(id: number): Promise<Institution> {
    const institution = await this.institutionRepository.findOne({
      where: { id },
      relations: [
        'criterionGroup', 'criterionGroup.criterions',
        'company', 'company.image', 'manager',
      ],
    });

    if (!institution) {
      throw new NotFoundError([{
        field: '',
        message: ERRORS.NOT_FOUND,
      }]);
    }
    return institution;
  }
}
