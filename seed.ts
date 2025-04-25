// seedAll.ts (atau .js jika pakai CommonJS)
// ---------------------------------------
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import UserModel from "./src/model/user.model";
import CategoryModel from "./src/model/category.model";
import BrandModel from "./src/model/brand.model";
import ProductModel from "./src/model/product.model";
import { env } from "./src/config/env";
import { ICategory } from "./src/types/category";

async function seed() {
  try {
    // 1. Connect
    await mongoose.connect(env.MONGO_URL, {
      dbName: env.DB_NAME,
    });
    console.log("⏳ Database connected…");

    // 2. Clear existing data
    await Promise.all([
      UserModel.deleteMany(),
      CategoryModel.deleteMany(),
      BrandModel.deleteMany(),
      ProductModel.deleteMany(),
    ]);

    // 3. Seed Users (contoh singkat)
    await UserModel.create({
      fullName: "admin",
      username: "admin",
      email: "admin1@gmail.com",
      password: "admin12345",
      isActive: true,
      role: "admin",
    });
    for (let i = 0; i < 200; i++) {
      await UserModel.create({
        fullName: faker.person.fullName(),
        username: `${faker.person.firstName()}${i}`,
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }

    // 4. Seed Categories
    const categories = [];
    for (let i = 0; i < 50; i++) {
      const cat = await CategoryModel.create({
        name: faker.commerce.productMaterial(),
        description: faker.lorem.sentence(),
        icon: faker.image.url(),
      });
      categories.push(cat);
    }

    // 5. Seed Brands
    const brands = [];
    for (let i = 0; i < 10; i++) {
      const b = await BrandModel.create({
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        logo: faker.image.url(),
        banner: faker.image.url(),
      });
      brands.push(b);
    }

    // 7. Seed Products
    for (let i = 0; i < 300; i++) {
      // pilih 1–3 kategori acak
      const chosenCategories = faker.helpers.arrayElements(
        categories.map((c) => c._id),
        faker.number.int({ min: 1, max: 3 })
      );

      // pilih 1 brand dan 1 banner
      const chosenBrand = faker.helpers.arrayElement(brands)._id;

      // bikin array images URL (string)
      const images = Array.from({ length: 3 }).map(() =>
        faker.image.urlPicsumPhotos()
      );

      await ProductModel.create({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 0 })),
        quantity: faker.number.int({ min: 1, max: 100 }),
        category: chosenCategories,
        brand: chosenBrand,
        banner: faker.image.urlPicsumPhotos(),
        images: images,
      });
    }

    console.log("✅ Seeding finished!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🛑 Database disconnected");
  }
}

seed();
