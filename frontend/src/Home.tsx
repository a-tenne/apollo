import TodoInput from "./components/TodoInput";
import TodoItemList from "./components/TodoItemList";
import RefreshProvider from "./hooks/RefreshProvider";

export default function Home() {
  return (<RefreshProvider>
    <TodoInput />
    <TodoItemList />
  </RefreshProvider>);
}
