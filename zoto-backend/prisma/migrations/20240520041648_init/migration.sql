-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameKana" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "companyCode" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
