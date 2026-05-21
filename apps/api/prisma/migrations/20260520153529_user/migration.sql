-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "userRole" NOT NULL DEFAULT 'USER';
