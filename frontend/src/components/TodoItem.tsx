import axios from "axios";
import type { ItemDTO } from "../types/Item";
import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { RefreshContext } from "../hooks/RefreshContext";
import { baseButton } from "../styles/button";

interface TodoItemProps {
  item: ItemDTO;
  showCompleted: boolean;
}

export default function TodoItem({ item, showCompleted }: TodoItemProps) {
  const { triggerRefresh } = useContext(RefreshContext)!;
  const [modelIsOpen, setModalOpen] = useState(false);
  async function deleteItem() {
    try {
      const res = await axios.delete(`/api/v1/items/${item.id}`);
      if (res.status >= 200 && res.status < 300) {
        triggerRefresh();
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function toggleComplete() {
    try {
      const res = await axios.put("/api/v1/items", {
        ...item,
        completed: !item.completed,
      });
      if (res.status >= 200 && res.status < 300) {
        triggerRefresh();
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div key={item.id}>
      <EditModal item={item} isOpen={modelIsOpen} onClose={() => setModalOpen(false)} />
      {showCompleted === item.completed &&
        <div className="flex flex-col space-y-1 border rounded p-4">
          <span className="font-extrabold text-xl">{item.title}</span>
          <p>{item.contents}</p>
          <span><span className="font-bold">Creation Date: </span>{item.creationDate}</span>
          <div className="flex flex-row gap-4">
            <button onClick={toggleComplete} className={"bg-green-500 min-h-8 " + baseButton}>{item.completed ? "Revert" : "Complete"}</button>
            <button type="button" onClick={deleteItem} className={"bg-red-500 min-h-8 " + baseButton}>Delete</button>
            <button type="button" onClick={() => setModalOpen(true)} className={"bg-yellow-300 text-black min-h-8 " + baseButton}>Edit</button>
          </div>
        </div>
      }
    </div>
  );
}

interface EditModalProps {
  item: ItemDTO;
  isOpen: boolean;
  onClose: () => void;
}

function EditModal({ item, isOpen, onClose }: EditModalProps) {
  const [newItem, setNewItem] = useState<ItemDTO>({ ...item });
  const { triggerRefresh } = useContext(RefreshContext)!;

  async function editItem() {
    try {
      const res = await axios.put("/api/v1/items", newItem);
      if (res.status >= 200 && res.status < 300) {
        triggerRefresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    editItem();
    onClose();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (name !== "title" && name !== "contents") {
      throw new Error("Tried accessing invalid field in object. Key: " + name);
    }
    setNewItem({ ...newItem, [name]: value });
  }

  return (<>{isOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-gray-800 rounded-lg shadow-lg p-6 z-10 lg:min-w-lg">
        <h2 className="text-2xl font-bold">Edit</h2>
        <form className="flex flex-col p-4 gap-2" onSubmit={handleSubmit}>
        <label className="text-xl">Title</label>
        <input type="text" name="title" value={newItem.title} onChange={handleChange} className="border rounded p-2" />
        <label className="text-xl">Contents</label>
        <textarea name="contents" value={newItem.contents} onChange={handleChange} className="border rounded p-2 overflow-hidden" />
          <button type="submit" className={"bg-yellow-300 text-black " + baseButton}>Change</button>
        </form>
        <button
          onClick={onClose}
          className={"px-4 py-2 bg-blue-500 " + baseButton}
        >
          Close
        </button>
      </div>
    </div>
  )}</>);

}
