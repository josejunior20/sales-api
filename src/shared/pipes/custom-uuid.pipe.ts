import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate as isUuid } from 'uuid';

@Injectable()
export class CustomUUIDPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): string {
    if (!isUuid(value)) {
      throw new BadRequestException('O ID fornecido não é um UUID válido.');
    }
    return value;
  }
}
