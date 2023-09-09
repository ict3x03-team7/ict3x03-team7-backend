#!/bin/bash

echo "*****************************************************"
echo "REMIGRATING DATABASE FOR PRISMA SCHEMA!"
echo "*****************************************************"

cd ..

# Delete the current prisma migration
rm -rf prisma

# Create the new migration based on our docker DB...
npx prisma init --datasource-provider=mysql
npx prisma db pull
mkdir -p prisma/migrations/0_init
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
npx prisma migrate resolve --applied 0_init
npx prisma generate


echo "*****************************************************"
echo "FINISH REMIGRATING!"
echo "*****************************************************"