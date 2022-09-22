import { ValidationError, ValidationPipe } from '@nestjs/common'

export class ValidatePipe extends ValidationPipe {
  protected mapChildrenToValidationErrors(error: ValidationError, parentPath?: string):
  ValidationError[] {
    const errors = super.mapChildrenToValidationErrors(error, parentPath)
    return errors
  }
}
