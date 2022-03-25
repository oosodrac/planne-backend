/*
  Warnings:

  - Added the required column `baldeId` to the `Fruta` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fruta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "expiracao" INTEGER NOT NULL,
    "baldeId" INTEGER NOT NULL,
    CONSTRAINT "Fruta_baldeId_fkey" FOREIGN KEY ("baldeId") REFERENCES "Balde" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fruta" ("expiracao", "id", "nome", "preco") SELECT "expiracao", "id", "nome", "preco" FROM "Fruta";
DROP TABLE "Fruta";
ALTER TABLE "new_Fruta" RENAME TO "Fruta";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
