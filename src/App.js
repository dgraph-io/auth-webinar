import React from "react"
import { useQuery, useMutation } from "@apollo/client"
import { Todos } from "react-todomvc"

import "react-todomvc/dist/todomvc.css"
import { useAuth0 } from "@auth0/auth0-react"
import { GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO, CLEAR_COMPLETED_TODOS, TOGGLE_TODO } from "./GraphQLData"

function App() {
  const [add] = useMutation(ADD_TODO)
  const [del] = useMutation(DELETE_TODO)
  const [upd] = useMutation(UPDATE_TODO)
  const [clear] = useMutation(CLEAR_COMPLETED_TODOS)

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const { loading, error, data } = useQuery(GET_TODOS)
  if (loading) return <p>Loading</p>
  if (error) {
    return <p>`Error: ${error.message}`</p>
  }

  const addNewTodo = (title) =>
    add({
      variables: { task: { title: title, completed: false, user: { username: user.email } } },
      update(cache, { data }) {
        const existing = cache.readQuery({ query: GET_TODOS })
        cache.writeQuery({
          query: GET_TODOS,
          data: {
            queryTask: [
              ...(existing ? existing.queryTask : []),
              ...data.addTask.task,
            ],
          },
        })
      },
    })

  const updateTodo = (modifiedTask) =>
    upd({
      variables: {
        id: modifiedTask.id,
        task: {
          value: modifiedTask.title,
          completed: modifiedTask.completed,
        },
      },
      update(cache, { data }) {
        data.updateTask.task.map((t) =>
          cache.modify({
            id: cache.identify(t),
            fields: {
              title: () => t.title,
              completed: () => t.completed,
            },
          })
        )
      },
    })

  const deleteTodo = (id) =>
    del({
      variables: { id },
      update(cache, { data }) {
        data.deleteTask.task.map(t => cache.evict({ id: cache.identify(t) }))
      },
    })

  const clearCompletedTodos = () =>
    clear({
      update(cache, { data }) {
        data.deleteTask.task.map(t => cache.evict({ id: cache.identify(t) }))
      },
    })

    const logInOut = !isAuthenticated ? (
      <p>
        <a href="#" onClick={loginWithRedirect}>Log in</a> to use the app.
      </p>
    ) : (
      <p>
        <a
          href="#"
          onClick={() => {
            logout({ returnTo: window.location.origin })
          }}
        >
          Log out
        </a>{" "}
        once you are finished, {user.email}.
      </p>
    );

  return (
    <div>
      {logInOut}
      <Todos
        todos={data.queryTodo}
        addNewTodo={addNewTodo}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        clearCompletedTodos={clearCompletedTodos}
        todosTitle="Todos"
      />
    </div>
  )
}

export default App
