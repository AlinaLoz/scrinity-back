import { EntityRepository, Repository } from 'typeorm';

import { Institution } from '@libs/entities/institution.entity';

@EntityRepository(Institution)
export class InstitutionRepository extends Repository<Institution> {
  getInstitutionForAggregation(): Promise<Institution[]> {
    return this.createQueryBuilder('inst')
      .innerJoinAndSelect('inst.publicPlatforms', 'ipp', 'ipp."institutionId" = inst.id AND ipp."isActive" = TRUE')
      .innerJoinAndSelect('ipp.publicPlatform', 'pp', 'pp.id = ipp."publicPlatformId" AND pp."isActive" = TRUE')
      .where('inst."isActive" = TRUE')
      .getMany();
  }
}
