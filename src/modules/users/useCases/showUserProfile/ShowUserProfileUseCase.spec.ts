import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


let userRepositoryInMemory: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase
let createUserUseCase: CreateUserUseCase;

describe("Test Show user profile", () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository()
    showUserProfileUseCase = new ShowUserProfileUseCase(userRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  })

  it("Should be able show user profile", async () => {
    const user = await createUserUseCase.execute({email: 'Kainan', name: "fd", password: "143"})

    const userProfile = await showUserProfileUseCase.execute(user.id as string)

    expect(userProfile).toHaveProperty("id");
  })
})
