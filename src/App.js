import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 1, packed: false },
  { id: 2, description: "Charger", quantity: 1, packed: false },
];
export default function App() {
  const [items, setItems] = useState(initialItems);
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
    const confirm = window.confirm("Are you sure you want to clear all items?");
    if (!confirm) return;
    setItems([]);
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
    </div>
  );
}
function Logo() {
  return <h1>💼FAR AWAY🌴</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    if (!description) return;
    const newItem = { id: Date.now(), description, quantity, packed: false };
    //setItems([...items, newItem]);
    onAddItems(newItem);
    console.log(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for trip😍</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Items..."
      />
      <button type="submit">Submit</button>
    </form>
  );
}
function PackingList({ items, onDeleteItems, onTogglePacked, onClearAll }) {
  const [sort, setSort] = useState("input");
  let sortedItems = [...items];
  if (sort === "packed") {
    sortedItems = sortedItems.sort((a, b) => a.packed - b.packed);
  } else if (sort === "description") {
    sortedItems = sortedItems.sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItems={onDeleteItems}
            onTogglePacked={onTogglePacked}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="packed">Sort by packed</option>
          <option value="description">Sort by description</option>
        </select>
        <button onClick={onClearAll}>Clear Items</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onTogglePacked }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed} // Corrected attribute
        onChange={() => onTogglePacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}
function Stat({ items }) {
  if (items.length === 0)
    return <p className="stats">Start adding some items 🚀 </p>;
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentagePacked =
    numItems === 0 ? 0 : Math.round((numPacked * 100) / numItems);

  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? "You got everything! ready to go ✈"
          : `You have ${numItems} items on your list and you already packed ${numPacked} (
            ${percentagePacked}%)`}
      </em>
    </footer>
  );
}
