import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { OperationType } from "../createStatement/CreateStatementController";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase, IRequest } from "./GetBalanceUseCase";


let statementRepositoryInMemory: InMemoryStatementsRepository;
let getBalanceUseCase: GetBalanceUseCase;
let createStatement: CreateStatementUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;

describe("Test get balance", () => {
  beforeEach(() => {
    statementRepositoryInMemory = new InMemoryStatementsRepository();
    userRepositoryInMemory = new InMemoryUsersRepository();

    createStatement = new CreateStatementUseCase(userRepositoryInMemory, statementRepositoryInMemory);
    getBalanceUseCase = new GetBalanceUseCase(statementRepositoryInMemory, userRepositoryInMemory);
  })

  it("Should not be able get balance, with user not exist", async () => {
    expect(async () => {
      await getBalanceUseCase.execute({ user_id: "42343" })
    }).rejects.toBeInstanceOf(GetBalanceError)
  })
})
