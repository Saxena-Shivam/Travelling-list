const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stat />
    </div>
  );
}
function Logo() {
  return <h1>💼FAR AWAY🌴</h1>;
}
function Form() {
  return (
    <form className="add-form">
      <h3>What do you need for trip😍</h3>
      <select></select>
      <input type="text" placeholder="Search..." />
      <button type="submit">Submit</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stat() {
  return (
    <footer className="stats">
      <em>You have X items on your list and You have packed x(x%) </em>
    </footer>
  );
}
