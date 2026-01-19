/*
  Warnings:

  - You are about to drop the column `content` on the `Subsection` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Subsection` table. All the data in the column will be lost.
  - Added the required column `contentId` to the `Subsection` table without a default value. This is not possible if the table is not empty.
  - Made the column `sectionId` on table `Subsection` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Subsection" DROP CONSTRAINT "Subsection_sectionId_fkey";

-- AlterTable
ALTER TABLE "Subsection" DROP COLUMN "content",
DROP COLUMN "video",
ADD COLUMN     "contentId" INTEGER NOT NULL,
ALTER COLUMN "sectionId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "body" JSONB NOT NULL,
    "videoUrl" TEXT,
    "subsectionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Content_subsectionId_key" ON "Content"("subsectionId");

-- AddForeignKey
ALTER TABLE "Subsection" ADD CONSTRAINT "Subsection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_subsectionId_fkey" FOREIGN KEY ("subsectionId") REFERENCES "Subsection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
