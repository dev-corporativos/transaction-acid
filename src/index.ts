import { AppDataSource } from "./data-source";
import express = require("express");
import { User } from "./entity/User";
import { Address } from "./entity/Address";

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await AppDataSource.getRepository(User).find({
      relations: ["addresses"],
    });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

app.post("/create", async (req, res) => {
  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const { name, age, address } = req.body;

    const newUser = queryRunner.manager.create(User, { name, age });
    await queryRunner.manager.save(newUser);

    const newAddress = queryRunner.manager.create(Address, {
      street: address.street,
      city: address.city,
      user: newUser,
    });

    await queryRunner.manager.save(newAddress);

    await queryRunner.commitTransaction();

    return res.json({
      message: "Transação concluída com sucesso!",
      user: newUser,
      address: newAddress,
    });
  } catch (err) {
    await queryRunner.rollbackTransaction();
    return res.status(500).json({ error: "Erro na transação", details: err });
  } finally {
    await queryRunner.release();
  }
});

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado.");
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000.");
    });
  })
  .catch((err) => {
    console.error("Erro ao inicializar o banco:", err);
  });
