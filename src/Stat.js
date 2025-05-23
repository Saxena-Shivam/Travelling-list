export function Stat({ items }) {
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
