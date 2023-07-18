import gql from "graphql-tag"

export const GET_TODOS = gql`
  query {
    queryTodo: queryTask {
      id
      value: title
      completed
    }
  }
`

export const ADD_TODO = gql`
  mutation addTask($task: AddTaskInput!) {
    addTodo: addTask(input: [$task]) {
      task {
        id
        value: title
        completed
      }
    }
  }
`

export const UPDATE_TODO = gql`
  mutation updateTask($id: ID!, $task: TaskPatch!) {
    updateTask(input: { filter: { id: [$id] }, set: $task }) {
      task {
        id
        value: title
        completed
      }
    }
  }
`

export const DELETE_TODO = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(filter: { id: [$id] }) {
      task {
        id
      }
    }
  }
`

export const CLEAR_COMPLETED_TODOS = gql`
  mutation updateTask {
    deleteTask(filter: { completed: true }) {
      task {
        id
      }
    }
  }
`