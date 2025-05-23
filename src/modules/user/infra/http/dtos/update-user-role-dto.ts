import { UserRole } from '@modules/user/domain/entities/User';
import { IsNotEmptyCustom } from '@shared/exceptions/decorators/IsNotEmptyCustom';

export class UpdateUserRoleDto {
  @IsNotEmptyCustom()
  role: UserRole[];
}
