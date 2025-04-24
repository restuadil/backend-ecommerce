import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import UserModel from "./src/model/user.model";
import CategoryModel from "./src/model/category.model";
import { env } from "./src/config/env";

// Koneksi ke MongoDB
mongoose.connect(env.MONGO_URL, { dbName: env.DB_NAME });

async function seed() {
  // Hapus data existing
  await Promise.all([UserModel.deleteMany()]);

  await UserModel.create({
    fullName: "admin",
    username: "admin",
    email: "admin1@gmail.com",
    password: "admin12345",
    isActive: true,
    role: "admin",
  });
  // Seed Users
  for (let i = 0; i < 200; i++) {
    await UserModel.create({
      fullName: faker.person.fullName(),
      username: faker.person.firstName() + i,
      email: faker.internet.email(),
      password: faker.internet.password(),
    }); 
  }

  for (let i = 0; i < 50; i++) {
    await CategoryModel.create({
      name: faker.commerce.productMaterial(),
      description: faker.lorem.sentence(),
      icon: faker.image.url(),
    });
  }
  console.log("Seeding completed!");
  mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  mongoose.disconnect();
});
