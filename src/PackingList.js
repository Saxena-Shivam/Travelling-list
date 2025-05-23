import { useState } from "react";
import { Item } from "./Item";

export function PackingList({
  items,
  onDeleteItems,
  onTogglePacked,
  onClearAll,
}) {
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
