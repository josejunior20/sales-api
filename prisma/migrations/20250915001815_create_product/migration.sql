/*
  Warnings:

  - You are about to drop the `BusinessCustomer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IndividualCustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BusinessCustomer" DROP CONSTRAINT "BusinessCustomer_customerId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualCustomer" DROP CONSTRAINT "IndividualCustomer_customerId_fkey";

-- DropTable
DROP TABLE "BusinessCustomer";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "IndividualCustomer";

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" "CustomerType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "individual_customers" (
    "customerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "business_customers" (
    "customerId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "tradeName" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "individual_customers_customerId_key" ON "individual_customers"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "individual_customers_cpf_key" ON "individual_customers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "business_customers_customerId_key" ON "business_customers"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "business_customers_cnpj_key" ON "business_customers"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "products_code_key" ON "products"("code");

-- AddForeignKey
ALTER TABLE "individual_customers" ADD CONSTRAINT "individual_customers_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_customers" ADD CONSTRAINT "business_customers_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
