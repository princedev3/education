-- DropForeignKey
ALTER TABLE "Pdf" DROP CONSTRAINT "Pdf_subjectId_fkey";

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Pdf" ADD COLUMN     "moduleId" TEXT,
ALTER COLUMN "subjectId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Pdf_subjectId_moduleId_idx" ON "Pdf"("subjectId", "moduleId");

-- AddForeignKey
ALTER TABLE "Pdf" ADD CONSTRAINT "Pdf_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pdf" ADD CONSTRAINT "Pdf_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;
