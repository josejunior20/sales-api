import { CreateIndividualCustomerService } from '@modules/customer/domain/services/Create-individual-customer.service';
import { DeleteIndividualCustomerService } from '@modules/customer/domain/services/Delete-individual-customer.service';
import { GetAllIndividualCustomerService } from '@modules/customer/domain/services/Get-all-individual-customer.service';
import { GetIndividualCustomerService } from '@modules/customer/domain/services/Get-individual-customer.service';
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

import { CreateIndividualCustomerDto } from '../dtos/create-individual-customer.dto';
import { UpdateIndividualCustomerDto } from '../dtos/update-individual-customer.dto';
import { IndividualCustomerViewModel } from '../view-models/individual-customer.view-model';
@Controller('individual-customers')
export class IndividualCustomerController {
  constructor(
    private readonly createCustomerService: CreateIndividualCustomerService,
    private readonly getAllCustomerService: GetAllIndividualCustomerService,
    private readonly getCustomerService: GetIndividualCustomerService,
    private readonly updateCustomerService: UpdateIndividualCustomerService,
    private readonly deleteCustomerService: DeleteIndividualCustomerService,
  ) {}

  @Post()
  async create(
    @Body() { name, cpf, email, phone, address }: CreateIndividualCustomerDto,
  ) {
    await this.createCustomerService.execute({
      name,
      cpf,
      email,
      phone,
      address,
    });
    return { message: 'Customer created successfully' };
  }

  @Get()
  async findAll() {
    const { customers } = await this.getAllCustomerService.execute();
    return { customers: customers.map(IndividualCustomerViewModel.toHttp) };
  }

  @Get(':id')
  async findById(@Param('id') customerId: string) {
    const { customer } = await this.getCustomerService.execute({
      customerId,
    });
    return { customer: IndividualCustomerViewModel.toHttp(customer) };
  }

  @Put(':id')
  async update(
    @Param('id') customerId: string,
    @Body() { name, email, phone, address }: UpdateIndividualCustomerDto,
  ) {
    await this.updateCustomerService.execute({
      customerId,
      name,
      email,
      phone,
      address,
    });
    return { message: 'Customer updated successfully' };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') customerId: string) {
    await this.deleteCustomerService.execute({ customerId });
  }
}
