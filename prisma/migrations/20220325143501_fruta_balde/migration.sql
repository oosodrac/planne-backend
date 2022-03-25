/*
  Warnings:

  - You are about to drop the column `baldeId` on the `Fruta` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "BaldeFruta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidadeFruta" INTEGER NOT NULL,
    "precoUnitario" DECIMAL NOT NULL,
    "precoTotal" DECIMAL NOT NULL,
    "baldeId" INTEGER NOT NULL,
    "frutaId" INTEGER NOT NULL,
    CONSTRAINT "BaldeFruta_baldeId_fkey" FOREIGN KEY ("baldeId") REFERENCES "Balde" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BaldeFruta_frutaId_fkey" FOREIGN KEY ("frutaId") REFERENCES "Fruta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fruta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "expiracao" INTEGER NOT NULL
);
INSERT INTO "new_Fruta" ("expiracao", "id", "nome", "preco") SELECT "expiracao", "id", "nome", "preco" FROM "Fruta";
DROP TABLE "Fruta";
ALTER TABLE "new_Fruta" RENAME TO "Fruta";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
