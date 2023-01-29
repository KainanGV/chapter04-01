import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { OperationType } from "../createStatement/CreateStatementController";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let userRepositoryInMemory: InMemoryUsersRepository;
let statementRepositoryInMemory: InMemoryStatementsRepository;
let createStatement: CreateStatementUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase

describe("Test get statement operation use case", () => {
  beforeEach(() => {
    statementRepositoryInMemory = new InMemoryStatementsRepository();
    userRepositoryInMemory = new InMemoryUsersRepository();

    getStatementOperationUseCase = new GetStatementOperationUseCase(userRepositoryInMemory, statementRepositoryInMemory);
    createStatement = new CreateStatementUseCase(userRepositoryInMemory, statementRepositoryInMemory);
  })

  it("Should be able get statement", async () => {
    const user = await userRepositoryInMemory.create({ email: "Kainan", name: "Kainan", password: "Kainsn" })

    const statementDeposit =
      await createStatement.execute({amount: 434, description: "olá mundo", type: OperationType.DEPOSIT, user_id: user.id as string})

    const statements = await getStatementOperationUseCase.execute({user_id: user.id as string, statement_id: statementDeposit.id as string})

    expect(statements).toHaveProperty('id')
  })
})
