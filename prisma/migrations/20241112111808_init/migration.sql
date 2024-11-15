/*
  Warnings:

  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "companyId" INTEGER,
ADD COLUMN     "jobPostId" INTEGER,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "registered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'normal',
ADD COLUMN     "sex" INTEGER NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "JobPost" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JobPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Stand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StandEvent" (
    "id" SERIAL NOT NULL,
    "standId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "StandEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventUser" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitDate" TIMESTAMP(3),

    CONSTRAINT "EventUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StandUser" (
    "id" SERIAL NOT NULL,
    "standId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitDate" TIMESTAMP(3),

    CONSTRAINT "StandUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StandEvent_standId_eventId_key" ON "StandEvent"("standId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "EventUser_eventId_userId_key" ON "EventUser"("eventId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "StandUser_standId_userId_key" ON "StandUser"("standId", "userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_jobPostId_fkey" FOREIGN KEY ("jobPostId") REFERENCES "JobPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StandEvent" ADD CONSTRAINT "StandEvent_standId_fkey" FOREIGN KEY ("standId") REFERENCES "Stand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StandEvent" ADD CONSTRAINT "StandEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUser" ADD CONSTRAINT "EventUser_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUser" ADD CONSTRAINT "EventUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StandUser" ADD CONSTRAINT "StandUser_standId_fkey" FOREIGN KEY ("standId") REFERENCES "Stand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StandUser" ADD CONSTRAINT "StandUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
