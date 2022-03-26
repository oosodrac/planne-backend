/*
  Warnings:

  - You are about to alter the column `ocupacao` on the `ResumoBalda` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ResumoBalda" (
    "total" DECIMAL NOT NULL DEFAULT 0,
    "ocupacao" DECIMAL NOT NULL DEFAULT 0,
    "balde" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_ResumoBalda" ("balde", "ocupacao", "total") SELECT "balde", "ocupacao", "total" FROM "ResumoBalda";
DROP TABLE "ResumoBalda";
ALTER TABLE "new_ResumoBalda" RENAME TO "ResumoBalda";
CREATE UNIQUE INDEX "ResumoBalda_balde_key" ON "ResumoBalda"("balde");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
