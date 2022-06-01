import { gql } from "apollo-server-express";

const userDefs = gql`
  type User {
    idUser: ID
    name: String
    password: String
  }
  type Task {
    id: ID
    title: String
    description: String
  }
  type Query {
    getUsers: [User]
  }
  input TaskInput {
    title: String
    description: String
  }
  type Mutation {
    createTask(task: TaskInput): Task
    deleteTask(id: ID): String
    updateTask(id: ID, task: TaskInput): Task
  }
`;

export { userDefs };
// exports.default = { userDefs };
