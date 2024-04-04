


export default function Items({ items }) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.productid}>
          <h3>{item.productname}</h3>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

