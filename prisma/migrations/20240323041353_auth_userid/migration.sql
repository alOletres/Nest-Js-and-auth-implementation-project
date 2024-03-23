/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('ADMIN', 'EMPLOYEE') NOT NULL DEFAULT 'EMPLOYEE';

-- CreateIndex
CREATE UNIQUE INDEX `Auth_userId_key` ON `Auth`(`userId`);
