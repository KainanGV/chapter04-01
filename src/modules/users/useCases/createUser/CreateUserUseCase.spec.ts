import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;

describe("Test Create user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  })

  it("Should be able create user", async () => {
    const user = await createUserUseCase.execute({email: 'Kainan', name: "fd", password: "143"})

    expect(user).toHaveProperty("id");
    expect(user.name).toEqual("fd")
  })
})
