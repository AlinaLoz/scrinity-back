import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Company } from '@libs/entities';
import { NotFoundError } from '@libs/exceptions/errors';
import { ERRORS } from '@libs/constants';

@Injectable()
export class CompaniesService {
  @InjectRepository(Company) private readonly companiesRepository: Repository<Company>;
  
  async getCompanyById(id: string): Promise<Company> {
    return await this.getCompanyOrFail(id);
  }
  
  private async getCompanyOrFail(id: string): Promise<Company> {
    const company = await this.companiesRepository.findOne({
      where: { id },
    });
    
    if (!company) {
      throw new NotFoundError([{
        field: '',
        message: ERRORS.NOT_FOUND,
      }]);
    }
    return company;
  }
}
