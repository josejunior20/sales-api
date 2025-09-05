import { IndividualCustomer } from '@modules/customer/domain/entities/Individual-customer';
import { IndividualCustomerRepository } from '@modules/customer/domain/repositories/Individual-customer.repositories';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma-service';
import { PaginatedResult } from '@shared/domain/interfaces/paginate.interface';

import { PrismaIndividualCustomerMapper } from '../mappers/prisma-individual-customer.mapper';

@Injectable()
export class PrismaIndividualCustomerRepository
  implements IndividualCustomerRepository
{
  constructor(private readonly prisma: PrismaService) {}
  async create(customer: IndividualCustomer): Promise<void> {
    const raw = PrismaIndividualCustomerMapper.toPrisma(customer);
    await this.prisma.individualCustomer.create({
      data: raw,
    });
  }

  async save(customer: IndividualCustomer): Promise<void> {
    const raw = PrismaIndividualCustomerMapper.toPrisma(customer);
    await this.prisma.individualCustomer.update({
      where: {
        customerId: customer.id,
      },
      data: raw,
    });
  }
  async delete(customerId: string): Promise<void> {
    await this.prisma.individualCustomer.delete({
      where: {
        customerId,
      },
    });
  }
  async findById(customerId: string): Promise<IndividualCustomer | null> {
    const raw = await this.prisma.individualCustomer.findUnique({
      where: { customerId },
      include: { customer: true },
    });
    if (!raw) return null;
    return PrismaIndividualCustomerMapper.toDomain(raw);
  }
  async findByCpf(cpf: string): Promise<IndividualCustomer | null> {
    const raw = await this.prisma.individualCustomer.findUnique({
      where: { cpf },
      include: { customer: true },
    });
    if (!raw) return null;
    return PrismaIndividualCustomerMapper.toDomain(raw);
  }
  async findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedResult<IndividualCustomer>> {
    const [rawCustomers, total] = await Promise.all([
      this.prisma.individualCustomer.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: { customer: true },
        orderBy: { customer: { createdAt: 'desc' } },
      }),
      this.prisma.individualCustomer.count(),
    ]);
    const customers = rawCustomers.map(raw =>
      PrismaIndividualCustomerMapper.toDomain(raw),
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
