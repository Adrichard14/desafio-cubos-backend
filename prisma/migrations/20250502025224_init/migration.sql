-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "senha" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "vote_average" INTEGER NOT NULL,
    "overview" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "runtime" INTEGER NOT NULL,
    "revenue" INTEGER NOT NULL,
    "popularity" INTEGER NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "original_language" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
