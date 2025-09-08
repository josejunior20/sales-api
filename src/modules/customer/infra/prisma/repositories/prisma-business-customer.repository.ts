import { BusinessCustomer } from '@modules/customer/domain/entities/Business-customer';
import { BusinessCustomerRepository } from '@modules/customer/domain/repositories/Business-customer.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma-service';
import { PaginatedResult } from '@shared/domain/interfaces/paginate.interface';

import { PrismaBusinessCustomerMapper } from '../mappers/prisma-business-customer.mapper';

@Injectable()
export class PrismaBusinessCustomerRepository
  implements BusinessCustomerRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(customer: BusinessCustomer): Promise<void> {
    const raw = PrismaBusinessCustomerMapper.toPrismaCreate(customer);
    await this.prisma.businessCustomer.create({
      data: raw,
    });
  }
  async save(customer: BusinessCustomer): Promise<void> {
    const raw = PrismaBusinessCustomerMapper.toPrismaUpdate(customer);
    await this.prisma.businessCustomer.update({
      where: {
        customerId: customer.id,
      },
      data: raw,
    });
  }
  async delete(customerId: string): Promise<void> {
    await this.prisma.businessCustomer.delete({
      where: {
        customerId,
      },
    });
  }
  async findById(customerId: string): Promise<BusinessCustomer | null> {
    const raw = await this.prisma.businessCustomer.findUnique({
      where: { customerId },
      include: { customer: true },
    });
    if (!raw) return null;
    return PrismaBusinessCustomerMapper.toDomain(raw);
  }

  async findByEmail(email: string): Promise<BusinessCustomer | null> {
    const raw = await this.prisma.businessCustomer.findFirst({
      where: {
        customer: {
          email,
        },
      },
      include: { customer: true },
    });
    if (!raw) return null;
    return PrismaBusinessCustomerMapper.toDomain(raw);
  }
  async findByCnpj(cnpj: string): Promise<BusinessCustomer | null> {
    const raw = await this.prisma.businessCustomer.findUnique({
      where: { cnpj },
      include: { customer: true },
    });
    if (!raw) return null;
    return PrismaBusinessCustomerMapper.toDomain(raw);
  }
  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<BusinessCustomer>> {
    const [rawCustomers, total] = await Promise.all([
      this.prisma.businessCustomer.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: { customer: true },
        orderBy: { customer: { createdAt: 'desc' } },
      }),
      this.prisma.businessCustomer.count(),
    ]);
    const customers = rawCustomers.map(raw =>
      PrismaBusinessCustomerMapper.toDomain(raw),
    );
    return {
      data: customers,
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    };
  }
}
