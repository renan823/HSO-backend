-- CreateTable
CREATE TABLE "RefreshToken" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "expiresIn" INTEGER NOT NULL,
    CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
