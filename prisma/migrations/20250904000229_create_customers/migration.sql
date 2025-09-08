-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('INDIVIDUAL', 'BUSINESS');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndividualCustomer" (
    "customerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BusinessCustomer" (
    "customerId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "tradeName" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualCustomer_customerId_key" ON "IndividualCustomer"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualCustomer_cpf_key" ON "IndividualCustomer"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCustomer_customerId_key" ON "BusinessCustomer"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCustomer_cnpj_key" ON "BusinessCustomer"("cnpj");

-- AddForeignKey
ALTER TABLE "IndividualCustomer" ADD CONSTRAINT "IndividualCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCustomer" ADD CONSTRAINT "BusinessCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
