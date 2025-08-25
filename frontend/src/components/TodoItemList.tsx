import { useContext, useEffect, useState } from "react";
import type { ItemDTO } from "../types/Item";
import axios from "axios";
import TodoItem from "./TodoItem";
import CompletedButton from "./CompletedButton";
import { RefreshContext } from "../hooks/RefreshContext";

export default function TodoItemList() {
  const [showCompleted, setShowCompleted] = useState(false);
  const [items, setItems] = useState<ItemDTO[]>([]);
  const { refreshFlag } = useContext(RefreshContext)!;
  async function fetchItems() {
    try {
      const res = await axios.get("/api/v1/items");
      const sorted = (res.data as ItemDTO[]).sort((a, b) => a.id - b.id);
      setItems(sorted);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchItems();
  }, [refreshFlag]);

  return (
    <div className="flex flex-row justify-center" >
      <div className="flex flex-col space-y-4 md:min-w-md">
        <div className="flex flex-row space-x-2">
          <CompletedButton active={!showCompleted} onClick={() => setShowCompleted(false)} >TODO</CompletedButton>
          <CompletedButton active={showCompleted} onClick={() => setShowCompleted(true)} >Completed</CompletedButton>
        </div>
        {items.map(item => <TodoItem item={item} showCompleted={showCompleted} />)}
      </div>
    </div>
  );
}
