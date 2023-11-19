-- CreateTable
CREATE TABLE "CollectionSchedule" (
    "id" TEXT NOT NULL,
    "materialType" TEXT NOT NULL,
    "quantityKg" TEXT NOT NULL,
    "collectionStartTime" TEXT NOT NULL,
    "collectionEndTime" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "recyclerId" TEXT NOT NULL,

    CONSTRAINT "CollectionSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollectionSchedule" ADD CONSTRAINT "CollectionSchedule_recyclerId_fkey" FOREIGN KEY ("recyclerId") REFERENCES "Recycler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
