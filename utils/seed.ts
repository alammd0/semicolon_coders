import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const password = await bcrypt.hash("123456", 10);

  await prisma.user.createMany({
    data: [
        {
            firstName : "Khalid",
            lastName : "Alam",
            email : "alam@example.com",
            password : password,
            role : "admin",
            otp : "123456",
            isVerified : true
        }
    ],
    skipDuplicates: true,
  });
}


main()
  .then(() => console.log("User seed completed"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());