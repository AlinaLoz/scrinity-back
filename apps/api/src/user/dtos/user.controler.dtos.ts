import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ConstructableDTO } from '@libs/dtos';

class UserDTO {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  phoneNumber: string;

  @ApiProperty()
  @Expose()
  email: string;
}

export class GetMeResponseDTO extends ConstructableDTO<GetMeResponseDTO> {
  @ApiProperty({ type: UserDTO })
  @Type(() => UserDTO)
  @Expose()
  user: UserDTO | null;
}
