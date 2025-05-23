import { useState } from "react";
import Modal from "./Modal";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stat } from "./Stat";

const initialItems = [
  { id: 1, description: "Passports", quantity: 1, packed: false },
  { id: 2, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddItems(event) {
    setItems((items) => [...items, event]);
  }

  function handleDeleteItems(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleTogglePacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearAll() {
    setIsModalOpen(true);
  }

  function confirmClearAll() {
    setItems([]);
    setIsModalOpen(false);
  }

  function cancelClearAll() {
    setIsModalOpen(false);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onTogglePacked={handleTogglePacked}
        onClearAll={handleClearAll}
      />
      <Stat items={items} />
      {isModalOpen && (
        <Modal
          onConfirm={confirmClearAll}
          onCancel={cancelClearAll}
          message="Are you sure you want to clear all items?"
        />
      )}
    </div>
  );
}
