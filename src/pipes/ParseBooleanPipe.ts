import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ParseBooleanPipe implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata): boolean {
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
      return false;
    }
    return false;
  }
}