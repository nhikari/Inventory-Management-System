function ProductDialog({
  item,
  categories,
  suppliers,
  isEditing,
  onClose,
  onSave,
}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="product-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="dialog-heading">
          <div>
            <p className="eyebrow">PRODUCT DETAILS</p>
            <h2 id="dialog-title">
              {isEditing ? "Edit product" : "Add product"}
            </h2>
          </div>
          <button
            className="close-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSave(new FormData(event.currentTarget));
          }}
        >
          <label>
            Product name
            <input
              name="name"
              required
              maxLength="80"
              defaultValue={item.name || ""}
              placeholder="e.g. Wireless Mouse"
            />
          </label>
          <div className="form-row">
            <label>
              Product ID
              <input
                name="id"
                required
                maxLength="24"
                defaultValue={item.id || ""}
                placeholder="e.g. INV-1007"
                readOnly={isEditing}
              />
            </label>
            <label>
              Category
              <select
                name="category"
                defaultValue={item.category || categories[0]}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              Price ($)
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                required
                defaultValue={item.price ?? ""}
                placeholder="0.00"
              />
            </label>
            <label>
              Quantity
              <input
                name="quantity"
                type="number"
                min="0"
                step="1"
                required
                defaultValue={item.quantity ?? ""}
                placeholder="0"
              />
            </label>
          </div>
          <label>
            Supplier
            <select name="supplier" required defaultValue={item.supplier || ""}>
              <option value="" disabled>
                Select a supplier
              </option>
              {suppliers.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </label>
          <div className="dialog-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              {isEditing ? "Save changes" : "Add product"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ProductDialog;
