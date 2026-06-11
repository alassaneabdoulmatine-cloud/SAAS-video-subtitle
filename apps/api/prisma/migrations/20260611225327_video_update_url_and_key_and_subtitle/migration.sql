/*
  Warnings:

  - The values [READY,ERROR] on the enum `VideoStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `s3Key` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Video` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VideoStatus_new" AS ENUM ('PENDING', 'UPLOADING', 'PROCESSING', 'SUCCESS', 'FAILED');
ALTER TABLE "public"."Video" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Video" ALTER COLUMN "status" TYPE "VideoStatus_new" USING ("status"::text::"VideoStatus_new");
ALTER TYPE "VideoStatus" RENAME TO "VideoStatus_old";
ALTER TYPE "VideoStatus_new" RENAME TO "VideoStatus";
DROP TYPE "public"."VideoStatus_old";
ALTER TABLE "Video" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "s3Key",
DROP COLUMN "thumbnail",
ADD COLUMN     "subtitles" JSONB,
ADD COLUMN     "thumbnailKey" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT,
ADD COLUMN     "videoFinalKey" TEXT,
ADD COLUMN     "videoRawKey" TEXT,
ADD COLUMN     "videoRawUrl" TEXT;
