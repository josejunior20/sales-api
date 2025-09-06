import { CreateIndividualCustomerService } from '@modules/customer/domain/services/Create-individual-customer.service';
import { DeleteIndividualCustomerService } from '@modules/customer/domain/services/Delete-individual-customer.service';
import { GetAllIndividualCustomerService } from '@modules/customer/domain/services/Get-all-individual-customer.service';
import { UpdateIndividualCustomerService } from '@modules/customer/domain/services/update-individual-customer.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomUUIDPipe } from '@shared/pipes/custom-uuid.pipe';

import { CreateIndividualCustomerDto } from '../dtos/create-individual-customer.dto';
import { UpdateIndividualCustomerDto } from '../dtos/update-individual-customer.dto';
import { IndividualCustomerViewModel } from '../view-models/individual-customer.view-model';
@Controller('individual-customers')
export class IndividualCustomerController {
  constructor(
    private readonly createCustomerService: CreateIndividualCustomerService,
    private readonly getAllCustomerService: GetAllIndividualCustomerService,
    private readonly updateCustomerService: UpdateIndividualCustomerService,
    private readonly deleteCustomerService: DeleteIndividualCustomerService,
  ) {}

  @Post()
  async create(
    @Body() { name, cpf, email, phone, address }: CreateIndividualCustomerDto,
  ) {
    const { customer } = await this.createCustomerService.execute({
      name,
      cpf,
      email,
      phone,
      address,
    });
    return { customer: IndividualCustomerViewModel.toHttp(customer) };
  }

  @Get()
  async findAll() {
    const { customers } = await this.getAllCustomerService.execute();
    return { customers: customers.map(IndividualCustomerViewModel.toHttp) };
  }

  @Put(':id')
  async update(
    @Param('id', CustomUUIDPipe) customerId: string,
    @Body() { name, email, phone, address }: UpdateIndividualCustomerDto,
  ) {
    await this.updateCustomerService.execute({
      customerId,
      name,
      email,
      phone,
      address,
    });
    return { message: 'User updated successfully' };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', CustomUUIDPipe) customerId: string) {
    await this.deleteCustomerService.execute({ customerId });
    return { message: 'User deleted successfully' };
  }
}
