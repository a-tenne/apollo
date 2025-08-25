import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import type { ItemCreateDTO } from "../types/Item";
import axios from "axios";
import { RefreshContext } from "../hooks/RefreshContext";
import { baseButton } from "../styles/button";

export default function TodoInput() {
  const [createItem, setCreateItem] = useState<ItemCreateDTO>(
    {
      title: "",
      contents: ""
    }
  );

  const { triggerRefresh } = useContext(RefreshContext)!;

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setCreateItem({ ...createItem, [name]: value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/items", createItem);
      if (res.status >= 200 && res.status < 300) {
        triggerRefresh();
        setCreateItem({ title: "", contents: "" });
      } else {
        // Placeholder
        alert("Error: failed to add TODO item");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mb-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full justify-center">
        <span className="text-3xl font-bold">Add TODO Item: </span>
        <label className="text-xl">Title</label>
        <input type="text" name="title" placeholder="Example: Buy cake ingredients" value={createItem.title} onChange={handleChange} className="border rounded p-2" />
        <label className="text-xl">Contents</label>
        <textarea name="contents" placeholder="Example: flour, eggs, sugar, ..." value={createItem.contents} onChange={handleChange} className="border rounded p-2 overflow-hidden" />
        <button type="submit" className={"bg-blue-400 max-w-xs min-h-10 " + baseButton }>Add Item</button>
      </form>
    </div>
  );
}
