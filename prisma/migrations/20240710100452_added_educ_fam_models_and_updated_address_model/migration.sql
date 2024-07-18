/*
  Warnings:

  - You are about to drop the column `address1` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `municipality` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personalId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Personal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cityMunicipality` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseNumStreetName` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "address1",
DROP COLUMN "address2",
DROP COLUMN "country",
DROP COLUMN "municipality",
DROP COLUMN "zip",
ADD COLUMN     "cityMunicipality" TEXT NOT NULL,
ADD COLUMN     "houseNumStreetName" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Family" (
    "id" TEXT NOT NULL,
    "personalId" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "motherOccupation" TEXT NOT NULL,
    "motherAnnualIncome" TEXT NOT NULL,
    "motherMobileNum" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "fatherOccupation" TEXT NOT NULL,
    "fatherAnnualIncome" TEXT NOT NULL,
    "fatherMobileNum" TEXT NOT NULL,
    "guardianName" TEXT NOT NULL,
    "guardianRelationshipToApplicant" TEXT NOT NULL,
    "guardianMobileNum" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "personalId" TEXT NOT NULL,
    "trackName" TEXT NOT NULL,
    "strandName" TEXT NOT NULL,
    "shsSchoolYearGraduated" TEXT NOT NULL,
    "shsGwa" TEXT NOT NULL,
    "shsSchoolName" TEXT NOT NULL,
    "shsSchoolAddress" TEXT NOT NULL,
    "shsSchoolContactNum" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Family_personalId_key" ON "Family"("personalId");

-- CreateIndex
CREATE UNIQUE INDEX "Education_personalId_key" ON "Education"("personalId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_personalId_key" ON "Address"("personalId");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_userId_key" ON "Personal"("userId");

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
