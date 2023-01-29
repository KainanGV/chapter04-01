import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { OperationType } from "./CreateStatementController";
import { CreateStatementError } from "./CreateStatementError";
import { CreateStatementUseCase } from "./CreateStatementUseCase"

let statementRepositoryInMemory: InMemoryStatementsRepository;
let createStatement: CreateStatementUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;


describe("Create Statement",() => {
  beforeEach(() => {
    statementRepositoryInMemory = new InMemoryStatementsRepository();
    userRepositoryInMemory = new InMemoryUsersRepository();

    createStatement = new CreateStatementUseCase(userRepositoryInMemory, statementRepositoryInMemory);
  })

  it("Should not be able create statement with user is not exist !", () => {
    expect(async () => {
      await createStatement.execute({amount: 434, description: "olá mundo", type: OperationType.DEPOSIT, user_id: "42343"})
    }).rejects.toBeInstanceOf(CreateStatementError.UserNotFound)
  })

  it("Should not be able create statement with balance smaller than amount !", () => {
    expect(async () => {
      const user = await userRepositoryInMemory.create({ email: "Kainan", name: "Kainan", password: "Kainsn" })

      await createStatement.execute({amount: 434, description: "olá mundo", type: OperationType.WITHDRAW, user_id: user.id as string})
    }).rejects.toBeInstanceOf(CreateStatementError.InsufficientFunds)
  })

  it("Should be able create statement deposit!", async () => {
    const user = await userRepositoryInMemory.create({ email: "Kainan", name: "Kainan", password: "Kainsn" })

    const statementDeposit =
      await createStatement.execute({amount: 434, description: "olá mundo", type: OperationType.DEPOSIT, user_id: user.id as string})

    expect(statementDeposit).toHaveProperty("id");
  })
})
