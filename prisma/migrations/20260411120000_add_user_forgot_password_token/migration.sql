ALTER TABLE "users"
ADD COLUMN "token" TEXT,
ADD COLUMN "token_expires_at" TIMESTAMP(3);

CREATE UNIQUE INDEX "users_token_key" ON "users"("token");
