/*
  Warnings:

  - You are about to drop the column `taskType` on the `categories` table. All the data in the column will be lost.
  - Added the required column `task_type` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "taskType",
ADD COLUMN     "task_type" TEXT NOT NULL;
