import { MainSeeder } from "../database/seeders/MainSeeder";


const seeder = async () => {
  new MainSeeder().run().then(() => {
    console.log('Running seeders successful..');
    process.exit();
  });
};

seeder();
