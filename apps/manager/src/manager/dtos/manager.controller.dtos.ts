import { ApiProperty  } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ConstructableDTO, FileDTO } from '@libs/dtos';

class ManagerDTO {
  @ApiProperty()
  @Expose() id: number;
  
  @ApiProperty()
  @Expose() name: string;
  
  @ApiProperty()
  @Expose() surname: string;
  
  @ApiProperty()
  @Expose() email: string;
  
  @ApiProperty({ type: FileDTO })
  @Type(() => FileDTO)
  @Expose() image: FileDTO;
}

export class GetMeResponseDTO extends ConstructableDTO<GetMeResponseDTO> {
  @ApiProperty({ type: ManagerDTO })
  @Type(() => ManagerDTO)
  @Expose() user: ManagerDTO | null;
}
