import { ApiBody } from '@nestjs/swagger';

export const ApiMultiFile = (fileName: string = 'files'): MethodDecorator => (
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) => {
  ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        [fileName]: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })(target, propertyKey, descriptor);
};
