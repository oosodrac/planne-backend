-- CreateTable
CREATE TABLE "Balde" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Fruta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL DEFAULT 0,
    "expiracao" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "BaldeFruta" (
    "id" TEXT NOT NULL,
    "balde" TEXT NOT NULL,
    "fruta" TEXT NOT NULL,

    PRIMARY KEY ("balde", "fruta")
);

-- CreateTable
CREATE TABLE "ResumoBalda" (
    "total" DECIMAL NOT NULL DEFAULT 0,
    "ocupacao" INTEGER NOT NULL DEFAULT 0,
    "balde" TEXT NOT NULL PRIMARY KEY
);

-- CreateIndex
CREATE UNIQUE INDEX "Balde_nome_key" ON "Balde"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Fruta_nome_key" ON "Fruta"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "BaldeFruta_id_key" ON "BaldeFruta"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ResumoBalda_balde_key" ON "ResumoBalda"("balde");
