function StockDistribution({ items, totalUnits }) {
  const sortedItems = [...items].sort(
    (first, second) => Number(second.quantity) - Number(first.quantity),
  );

  return (
    <section
      className="stock-distribution"
      aria-labelledby="stock-distribution-title"
    >
      <header className="distribution-heading">
        <div>
          <h2 id="stock-distribution-title">Stock distribution</h2>
          <p>Share of total units, sorted from most to fewest</p>
        </div>
        <span>{totalUnits.toLocaleString()} total units</span>
      </header>
      {sortedItems.length ? (
        <ol className="distribution-list">
          {sortedItems.map((item, index) => {
            const quantity = Number(item.quantity);
            const percentage =
              totalUnits > 0 ? (quantity / totalUnits) * 100 : 0;

            return (
              <li className="distribution-row" key={item.id}>
                <span className="distribution-rank">{index + 1}</span>
                <div className="distribution-product">
                  <strong>{item.name}</strong>
                  <span>{item.id}</span>
                </div>
                <div className="distribution-share">
                  <div
                    className="distribution-track"
                    role="progressbar"
                    aria-label={`${item.name} share of total stock`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={percentage.toFixed(1)}
                  >
                    <span style={{ width: `${percentage}%` }} />
                  </div>
                  <strong>{percentage.toFixed(1)}%</strong>
                </div>
                <span className="distribution-quantity">
                  {quantity.toLocaleString()} units
                </span>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="distribution-empty">
          Add products to see stock distribution.
        </p>
      )}
    </section>
  );
}

export default StockDistribution;
