import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useCustomHook } from "./context";


function App() {
  const { todos } = useCustomHook()
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-700 to-pink-200 p-6">
        <div className="max-w-3xl mx-auto rounded-lg shadow-lg p-6">
          <TodoForm />
          <div className="mt-6 space-y-4">
            {todos.map((todo) => (
              <div key={todo._id} className="bg-gray-100 rounded-lg shadow p-4">
                <TodoList data={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  )
}

export default App;


