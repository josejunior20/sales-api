import { CreateBusinessCustomerService } from '@modules/customer/domain/services/Create-business-customer.service';
import { DeleteBusinessCustomerService } from '@modules/customer/domain/services/Delete-business-customer.service';
import { GetAllBusinessCustomerService } from '@modules/customer/domain/services/Get-all-business-customer.service';
import { UpdateBusinessCustomerService } from '@modules/customer/domain/services/Update-business-customer.service';
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

import { CreateBusinessCustomerDto } from '../dtos/create-business-customer.dto';
import { UpdateBusinessCustomerDto } from '../dtos/update-business-customer.dto';
import { BusinessCustomerViewModel } from '../view-models/business-customer.view-model';
@Controller('business-customers')
export class BusinessCustomerController {
  constructor(
    private readonly createCustomerService: CreateBusinessCustomerService,
    private readonly getAllCustomerService: GetAllBusinessCustomerService,
    private readonly updateCustomerService: UpdateBusinessCustomerService,
    private readonly deleteCustomerService: DeleteBusinessCustomerService,
  ) {}

  @Post()
  async create(
    @Body()
    {
      companyName,
      tradeName,
      cnpj,
      email,
      phone,
      address,
    }: CreateBusinessCustomerDto,
  ) {
    await this.createCustomerService.execute({
      companyName,
      tradeName,
      cnpj,
      email,
      phone,
      address,
    });
    return { message: 'Customer created successfully' };
  }

  @Get()
  async findAll() {
    const { customers } = await this.getAllCustomerService.execute();
    return { customers: customers.map(BusinessCustomerViewModel.toHttp) };
  }

  @Put(':id')
  async update(
    @Param('id') customerId: string,
    @Body()
    {
      companyName,
      tradeName,
      email,
      phone,
      address,
    }: UpdateBusinessCustomerDto,
  ) {
    await this.updateCustomerService.execute({
      customerId,
      companyName,
      tradeName,
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
