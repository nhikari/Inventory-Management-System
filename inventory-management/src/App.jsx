import { useEffect, useMemo, useState } from "react";
import MetricCard from "./components/MetricCard";
import ProductDialog from "./components/ProductDialog";
import StockDistribution from "./components/StockDistribution";
import StatusBadge from "./components/StatusBadge";
import "./App.css";

const starterItems = [
  {
    id: "INV-1001",
    name: "Wireless Keyboard",
    category: "Electronics",
    price: 54.99,
    quantity: 28,
    supplier: "Pacific Tech Source",
  },
  {
    id: "INV-1002",
    name: "Desk Lamp",
    category: "Office",
    price: 32.5,
    quantity: 8,
    supplier: "Manila Office Essentials",
  },
  {
    id: "INV-1003",
    name: "Ceramic Travel Mug",
    category: "Accessories",
    price: 18,
    quantity: 0,
    supplier: "Isla Home & Drinkware",
  },
  {
    id: "INV-1004",
    name: "USB-C Hub",
    category: "Electronics",
    price: 46.75,
    quantity: 16,
    supplier: "MetroLink Components",
  },
  {
    id: "INV-1005",
    name: "Linen Notebook",
    category: "Stationery",
    price: 12.25,
    quantity: 42,
    supplier: "Papertrail Creative Supplies",
  },
  {
    id: "INV-1006",
    name: "Monitor Stand",
    category: "Office",
    price: 79,
    quantity: 5,
    supplier: "Summit Workspace Furnishings",
  },
  {
    id: "INV-1007",
    name: "Bluetooth Mouse",
    category: "Electronics",
    price: 24.99,
    quantity: 18,
    supplier: "Cebu Digital Depot",
  },
  {
    id: "INV-1008",
    name: "Ergonomic Office Chair",
    category: "Office",
    price: 149.5,
    quantity: 7,
    supplier: "Luzon Seating Works",
  },
  {
    id: "INV-1009",
    name: "Insulated Water Bottle",
    category: "Accessories",
    price: 21.75,
    quantity: 24,
    supplier: "Mindanao Housewares",
  },
  {
    id: "INV-1010",
    name: "Hardcover Planner",
    category: "Stationery",
    price: 16.5,
    quantity: 30,
    supplier: "Iloilo Paper & Print",
  },
  {
    id: "INV-1011",
    name: "HDMI Cable",
    category: "Electronics",
    price: 11.99,
    quantity: 35,
    supplier: "Baguio Circuit Supply",
  },
];

const storageKey = "stockroom-inventory";
const supplierItemsMigrationKey = "stockroom-supplier-items-v1";
const supplierCardDetailsMigrationKey = "stockroom-supplier-card-details-v2";
const itemsPerPage = 5;
const categories = [
  "Electronics",
  "Office",
  "Accessories",
  "Stationery",
  "Other",
];
const legacyStarterSuppliers = {
  "INV-1001": "Apex Supplies Ltd.",
  "INV-1002": "BluePeak Stationery",
  "INV-1003": "Harbor Market Trading",
  "INV-1004": "Vertex Industrial Supply",
  "INV-1005": "Northwind Goods Co.",
  "INV-1006": "Apex Supplies Ltd.",
};
const supplierDirectory = {
  "Pacific Tech Source": {
    name: "Pacific Tech Source",
    contact: "+63 912 345 6789",
    email: "orders@pacifictechsource.ph",
    leadTime: "2 business days",
    address: "Unit 4A, 1287 Taft Avenue, Ermita, Manila, Philippines",
  },
  "Manila Office Essentials": {
    name: "Manila Office Essentials",
    contact: "+63 921 998 2230",
    email: "sales@manilaofficeessentials.ph",
    leadTime: "3 business days",
    address: "56 J.P. Laurel Avenue, Bajada, Davao City, Philippines",
  },
  "Isla Home & Drinkware": {
    name: "Isla Home & Drinkware",
    contact: "+63 998 220 1840",
    email: "hello@islahome.ph",
    leadTime: "4 business days",
    address: "22 Osmeña Boulevard, Cebu City, Philippines",
  },
  "MetroLink Components": {
    name: "MetroLink Components",
    contact: "+63 905 510 3367",
    email: "team@metrolinkcomponents.ph",
    leadTime: "5 business days",
    address: "18 Commonwealth Avenue, Quezon City, Philippines",
  },
  "Papertrail Creative Supplies": {
    name: "Papertrail Creative Supplies",
    contact: "+63 917 771 2048",
    email: "orders@papertrailcreative.ph",
    leadTime: "6 business days",
    address: "91 Lacson Street, Bacolod City, Philippines",
  },
  "Summit Workspace Furnishings": {
    name: "Summit Workspace Furnishings",
    contact: "+63 917 442 6081",
    email: "supply@summitworkspace.ph",
    leadTime: "7 business days",
    address: "37 Magsaysay Avenue, Baguio City, Philippines",
  },
  "Cebu Digital Depot": {
    name: "Cebu Digital Depot",
    contact: "+63 932 518 7406",
    email: "orders@cebudigitaldepot.ph",
    leadTime: "8 business days",
    address: "Unit 12, 204 V. Rama Avenue, Cebu City, Philippines",
  },
  "Luzon Seating Works": {
    name: "Luzon Seating Works",
    contact: "+63 917 306 8521",
    email: "sales@luzonseating.ph",
    leadTime: "9 business days",
    address: "88 MacArthur Highway, San Fernando, Pampanga, Philippines",
  },
  "Mindanao Housewares": {
    name: "Mindanao Housewares",
    contact: "+63 945 681 2290",
    email: "hello@mindanaohousewares.ph",
    leadTime: "10 business days",
    address: "15 Bolton Street, Poblacion District, Davao City, Philippines",
  },
  "Iloilo Paper & Print": {
    name: "Iloilo Paper & Print",
    contact: "+63 928 415 6937",
    email: "supply@iloilopaperprint.ph",
    leadTime: "11 business days",
    address: "42 General Luna Street, Iloilo City, Philippines",
  },
  "Baguio Circuit Supply": {
    name: "Baguio Circuit Supply",
    contact: "+63 956 204 8137",
    email: "team@baguiocircuit.ph",
    leadTime: "12 business days",
    address: "7 Loakan Road, Baguio City, Philippines",
  },
};
const suppliers = Object.keys(supplierDirectory);
const detailViews = [
  "Supplier Details",
  "Unit Cost & Price",
  "Transaction Logs",
  "Low-Stock Alerts",
  "Audit History",
  "Valuation Reports",
  "Demand Trends",
];
const detailContent = {
  "Supplier Details": {
    summary: "Vendor contact information",
    description:
      "Maintain supplier contacts, delivery notes, and purchase coordination with a single source of truth.",
  },
  "Unit Cost & Price": {
    summary: "Financial valuation",
    description:
      "Track acquisition cost, selling price, and margin performance to protect profitability across your catalog.",
    list: [
      ["Unit cost", "$14.50 average"],
      ["Retail price", "$19.99"],
      ["Gross margin", "27.5%"],
      ["Marked down", "3 SKUs"],
    ],
    metric: ["Markup: 28%", "Updated"],
  },
  "Transaction Logs": {
    summary: "Sales, receipts, and returns",
    description:
      "Keep a clear transaction trail for stock movements, customer sales, and return processing with accurate timestamps.",
    list: [
      ["Sales", "238 entries"],
      ["Receipts", "36 vendor deliveries"],
      ["Returns", "12 processed"],
      ["Last sync", "2 hours ago"],
    ],
    metric: ["Last 30 days", "Synced"],
  },
  "Low-Stock Alerts": {
    summary: "Automated reorder notifications",
    description:
      "Trigger restocking and purchase actions before inventory drops below the minimum threshold for critical products.",
    list: [
      ["Critical", "4 products"],
      ["Reorder point", "10 units"],
      ["Next batch", "Friday"],
      ["Source", "Approved vendor"],
    ],
    metric: ["12 alerts", "Enabled"],
  },
  "Audit History": {
    summary: "Periodic count tracking",
    description:
      "Review stock-taking records and variance reports to identify shortages, overages, and process gaps quickly.",
    list: [
      ["Count date", "09/24"],
      ["Variance", "1.8%"],
      ["Adjustments", "7 items"],
      ["Reviewer", "Finance Team"],
    ],
    metric: ["4 cycle reviews", "Completed"],
  },
  "Valuation Reports": {
    summary: "Current stock worth",
    description:
      "Summarize the total value of your stock inventory using current quantities and pricing assumptions for financial planning.",
    list: [
      ["Current stock", "1,248 units"],
      ["Inventory value", "$18,420"],
      ["Sell-through", "71%"],
      ["Risk", "Low"],
    ],
    metric: ["$18,420", "Current"],
  },
  "Demand Trends": {
    summary: "Sales analytics for future purchasing",
    description:
      "Use sales velocity and performance trends to anticipate demand and plan smarter replenishment decisions.",
    list: [
      ["Top seller", "Wireless Keyboard"],
      ["Seasonal lift", "+21%"],
      ["Fast movers", "9 SKUs"],
      ["Forecast", "Strong"],
    ],
    metric: ["+14.2%", "Trending"],
  },
};

const productImageUrls = {
  "INV-1001":
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=120&h=120&q=80",
  "INV-1002":
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=120&h=120&q=80",
  "INV-1003":
    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=120&h=120&q=80",
  "INV-1004":
    "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=120&h=120&q=80",
  "INV-1005":
    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=120&h=120&q=80",
  "INV-1006":
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=120&h=120&q=80",
};
const categoryImageUrls = {
  Electronics: productImageUrls["INV-1001"],
  Office: productImageUrls["INV-1002"],
  Accessories: productImageUrls["INV-1003"],
  Stationery: productImageUrls["INV-1005"],
  Other: productImageUrls["INV-1001"],
};

function getProductImage(item) {
  return (
    item.imageUrl ||
    productImageUrls[item.id] ||
    categoryImageUrls[item.category] ||
    categoryImageUrls.Other
  );
}

function getStatus(quantity) {
  if (quantity <= 0) return "Out of stock";
  if (quantity <= 10) return "Low stock";
  return "In stock";
}

function getSupplierDetails(supplierName) {
  return (
    supplierDirectory[supplierName] || {
      name: supplierName || "Unassigned supplier",
      contact: "No contact listed",
      email: "No email listed",
      leadTime: "Not specified",
      address: "Not specified",
    }
  );
}

function readItems() {
  try {
    const savedItems = JSON.parse(localStorage.getItem(storageKey));
    if (!Array.isArray(savedItems)) return starterItems;

    let migratedItems = savedItems.map((item) => {
      const legacySupplier = legacyStarterSuppliers[item.id];
      const starterItem = starterItems.find(
        (starter) => starter.id === item.id,
      );

      return legacySupplier && item.supplier === legacySupplier
        ? { ...item, supplier: starterItem.supplier }
        : item;
    });

    const usedSuppliers = new Set();
    if (localStorage.getItem(supplierCardDetailsMigrationKey) !== "complete") {
      migratedItems = migratedItems.map((item) => {
        const starterItem = starterItems.find(
          (starter) => starter.id === item.id,
        );
        let supplierName = item.supplier;

        if (
          starterItem &&
          (!supplierDirectory[supplierName] || usedSuppliers.has(supplierName))
        ) {
          supplierName =
            starterItem.supplier && !usedSuppliers.has(starterItem.supplier)
              ? starterItem.supplier
              : suppliers.find((supplier) => !usedSuppliers.has(supplier));
        }

        if (supplierDirectory[supplierName]) usedSuppliers.add(supplierName);
        return supplierName === item.supplier
          ? item
          : { ...item, supplier: supplierName };
      });
    } else {
      migratedItems.forEach((item) => {
        if (supplierDirectory[item.supplier]) usedSuppliers.add(item.supplier);
      });
    }

    if (localStorage.getItem(supplierItemsMigrationKey) !== "complete") {
      const existingIds = new Set(migratedItems.map((item) => item.id));
      starterItems
        .filter(
          (item) =>
            Number(item.id.slice(4)) >= 1007 && !existingIds.has(item.id),
        )
        .forEach((item) => {
          const supplierName = usedSuppliers.has(item.supplier)
            ? suppliers.find((supplier) => !usedSuppliers.has(supplier))
            : item.supplier;
          migratedItems.push({ ...item, supplier: supplierName });
          usedSuppliers.add(supplierName);
        });
      localStorage.setItem(supplierItemsMigrationKey, "complete");
    }

    localStorage.setItem(supplierCardDetailsMigrationKey, "complete");
    return migratedItems;
  } catch {
    return starterItems;
  }
}

function App() {
  const [items, setItems] = useState(readItems);
  const [currentDateTime, setCurrentDateTime] = useState(() => new Date());
  const [activeView, setActiveView] = useState("Overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All status");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogItem, setDialogItem] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const clockInterval = window.setInterval(
      () => setCurrentDateTime(new Date()),
      1000,
    );

    return () => window.clearInterval(clockInterval);
  }, []);

  const totals = useMemo(
    () => ({
      products: items.length,
      units: items.reduce((sum, item) => sum + Number(item.quantity), 0),
      lowStock: items.filter((item) => getStatus(item.quantity) === "Low stock")
        .length,
      inventoryValue: items.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0,
      ),
    }),
    [items],
  );

  const visibleItems = useMemo(
    () =>
      items.filter((item) => {
        const matchesSearch = `${item.name} ${item.id} ${item.category} ${item.supplier || ""}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "All status" ||
          getStatus(item.quantity) === statusFilter;
        const matchesCategory =
          categoryFilter === "All categories" ||
          item.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
      }),
    [items, search, statusFilter, categoryFilter],
  );

  const pageCount = Math.max(1, Math.ceil(visibleItems.length / itemsPerPage));
  const displayedPage = Math.min(currentPage, pageCount);
  const pageItems = visibleItems.slice(
    (displayedPage - 1) * itemsPerPage,
    displayedPage * itemsPerPage,
  );
  const firstVisibleItem =
    visibleItems.length === 0 ? 0 : (displayedPage - 1) * itemsPerPage + 1;
  const lastVisibleItem = Math.min(
    displayedPage * itemsPerPage,
    visibleItems.length,
  );

  const dialogIsEditing =
    dialogItem && items.some((item) => item.id === dialogItem.id);

  function saveItem(formData) {
    const isEditing = Boolean(
      dialogItem && items.some((item) => item.id === dialogItem.id),
    );
    const nextItem = {
      id: formData.get("id").trim(),
      name: formData.get("name").trim(),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      supplier: formData.get("supplier"),
    };
    setItems((current) =>
      isEditing
        ? current.map((item) => (item.id === dialogItem.id ? nextItem : item))
        : [nextItem, ...current],
    );
    setCurrentPage(1);
    setDialogItem(null);
    setNotice(isEditing ? "Product updated" : "Product added");
    window.setTimeout(() => setNotice(""), 2400);
  }

  function deleteItem(id) {
    if (!window.confirm("Delete this product from inventory?")) return;
    setItems((current) => current.filter((item) => item.id !== id));
    setNotice("Product deleted");
    window.setTimeout(() => setNotice(""), 2400);
  }

  function exportCsv() {
    const rows = [
      ["ID", "Name", "Category", "Price", "Quantity", "Supplier", "Status"],
      ...items.map((item) => [
        item.id,
        item.name,
        item.category,
        item.price,
        item.quantity,
        item.supplier || "",
        getStatus(item.quantity),
      ]),
    ];
    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "inventory.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const pageHeader =
    activeView === "Overview"
      ? "Overview"
      : activeView === "Categories"
        ? "Categories"
        : activeView === "Inventory"
          ? "Inventory"
          : activeView;

  const pageDescription =
    activeView === "Inventory"
      ? "Manage your products, stock levels, and catalog."
      : activeView === "Categories"
        ? "A quick look at how your catalog is organized."
        : activeView === "Overview"
          ? "A clear view of what is happening in your stockroom."
          : "Operational insights for purchasing, finance, and inventory control.";

  const isDetailView = detailViews.includes(activeView);
  const showAddProductButton = !isDetailView;

  const supplierCards = useMemo(
    () =>
      items.map((item) => ({
        ...getSupplierDetails(item.supplier),
        product: item,
      })),
    [items],
  );

  const currentDetail = detailContent[activeView] || null;

  const detailList = currentDetail?.list || [];
  const detailMetric = currentDetail?.metric || ["", ""];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          className="brand"
          href="#inventory"
          onClick={() => setActiveView("Inventory")}
        >
          <span className="brand-mark">S</span>
          <span>
            stockroom<span className="brand-period">.</span>
            <small>INVENTORY CONTROL</small>
          </span>
        </a>

        <p className="nav-label">WORKSPACE</p>
        <nav aria-label="Main navigation">
          {["Overview", "Inventory", "Categories"].map((view) => (
            <button
              key={view}
              className={`nav-link ${activeView === view ? "active" : ""}`}
              onClick={() => setActiveView(view)}
            >
              <span
                className={`nav-symbol ${view.toLowerCase()}`}
                aria-hidden="true"
              />
              {view}
              {view === "Inventory" && (
                <span className="nav-count">{items.length}</span>
              )}
            </button>
          ))}
        </nav>

        <p className="nav-label secondary">DETAILS</p>
        <nav aria-label="Operational detail navigation">
          {detailViews.map((view) => (
            <button
              key={view}
              className={`nav-link subnav ${activeView === view ? "active" : ""}`}
              onClick={() => setActiveView(view)}
            >
              <span className="nav-symbol detail" aria-hidden="true" />
              {view}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="user-avatar">PC</div>
          <div className="user-info">
            <strong>Precious Cariazo</strong>
            <span>Store manager</span>
          </div>
          <span className="online-dot" aria-label="Online" />
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>{activeView}</strong>
          </div>
          <div className="topbar-right">
            <span className="sync-status">
              <i /> All changes saved
            </span>
            <button className="avatar-small" aria-label="Account menu">
              PC
            </button>
          </div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div>
              <p className="eyebrow">
                {currentDateTime
                  .toLocaleString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                  .toUpperCase()}
              </p>
              <h1>{pageHeader}</h1>
              <p className="page-description">{pageDescription}</p>
            </div>
            <div className="heading-actions">
              <button className="button button-secondary" onClick={exportCsv}>
                <span aria-hidden="true">↓</span> Export
              </button>
              {showAddProductButton && (
                <button
                  className="button button-primary"
                  onClick={() =>
                    setDialogItem({ id: `INV-${String(Date.now()).slice(-6)}` })
                  }
                >
                  <span aria-hidden="true">＋</span> Add product
                </button>
              )}
            </div>
          </section>

          {isDetailView ? (
            <section className="detail-page">
              <div className="detail-header">
                <div>
                  <p className="eyebrow">OPERATIONAL DETAIL</p>
                  <h2>{activeView}</h2>
                </div>
                <button
                  className="button button-primary"
                  onClick={() => setActiveView("Overview")}
                >
                  Back to overview
                </button>
              </div>

              {activeView === "Supplier Details" ? (
                <section className="supplier-section">
                  <div className="supplier-section-heading">
                    <div>
                      <h3>{currentDetail?.summary}</h3>
                      <p>{currentDetail?.description}</p>
                    </div>
                    <span className="supplier-count">
                      {supplierCards.length}{" "}
                      {supplierCards.length === 1
                        ? "supplier card"
                        : "supplier cards"}
                    </span>
                  </div>

                  {supplierCards.length > 0 ? (
                    <div className="supplier-card-grid">
                      {supplierCards.map((supplier) => (
                        <article
                          className="supplier-card"
                          key={supplier.product.id}
                        >
                          <div className="supplier-card-heading">
                            <span className="supplier-avatar" aria-hidden="true">
                              {supplier.name
                                .split(/\s+/)
                                .slice(0, 2)
                                .map((word) => word[0])
                                .join("")
                                .toUpperCase()}
                            </span>
                            <div>
                              <h4>{supplier.name}</h4>
                              <p>Address: {supplier.address}</p>
                            </div>
                          </div>

                          <dl className="supplier-contact-list">
                            <div>
                              <dt>Contact</dt>
                              <dd>{supplier.contact}</dd>
                            </div>
                            <div>
                              <dt>Email</dt>
                              <dd>{supplier.email}</dd>
                            </div>
                            <div>
                              <dt>Lead time</dt>
                              <dd>{supplier.leadTime}</dd>
                            </div>
                          </dl>

                          <div className="supplier-products">
                            <span>1 product</span>
                            <ul className="supplier-product-list">
                              <li>
                                <div>
                                  <strong>{supplier.product.name}</strong>
                                  <span>{supplier.product.id}</span>
                                </div>
                                <p>
                                  {supplier.product.category} · $
                                  {Number(supplier.product.price).toFixed(2)} ·{" "}
                                  {supplier.product.quantity} units
                                </p>
                              </li>
                            </ul>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <p className="supplier-empty">
                      No suppliers are linked to inventory products yet.
                    </p>
                  )}
                </section>
              ) : (
                <div className="detail-grid">
                  <article className="detail-panel card-emphasis">
                    <span className="detail-badge">Live status</span>
                    <h3>{currentDetail?.summary || "Operational detail"}</h3>
                    <p>{currentDetail?.description || ""}</p>

                    <div className="detail-stats">
                      <div>
                        <span>Reference</span>
                        <strong>{detailMetric[0]}</strong>
                      </div>
                      <div>
                        <span>Status</span>
                        <strong>{detailMetric[1]}</strong>
                      </div>
                    </div>
                  </article>

                  <aside className="detail-panel">
                    <h3>Key information</h3>
                    <ul className="detail-list">
                      {detailList.map(([label, value]) => (
                        <li key={label}>
                          <strong>{label}:</strong> {value}
                        </li>
                      ))}
                    </ul>
                  </aside>
                </div>
              )}
            </section>
          ) : activeView === "Categories" ? (
            <section className="category-grid" aria-label="Product categories">
              {categories.map((category, index) => {
                const categoryItems = items.filter(
                  (item) => item.category === category,
                );
                return (
                  <button
                    className="category-tile"
                    key={category}
                    onClick={() => {
                      setCategoryFilter(category);
                      setActiveView("Inventory");
                    }}
                  >
                    <span className={`category-number color-${index}`}>
                      0{index + 1}
                    </span>
                    <strong>{category}</strong>
                    <span>
                      {categoryItems.length} products ·{" "}
                      {categoryItems.reduce(
                        (sum, item) => sum + Number(item.quantity),
                        0,
                      )}{" "}
                      units
                    </span>
                    <span className="category-arrow">→</span>
                  </button>
                );
              })}
            </section>
          ) : activeView === "Overview" ? (
            <>
              <section className="metrics" aria-label="Inventory summary">
                <MetricCard
                  label="Total products"
                  value={totals.products}
                  detail="Unique items in catalog"
                  icon="#"
                  iconClass="products-icon"
                />
                <MetricCard
                  label="Units in stock"
                  value={totals.units.toLocaleString()}
                  detail="Across all products"
                  icon="▤"
                  iconClass="units-icon"
                />
                <MetricCard
                  label="Low stock items"
                  value={totals.lowStock}
                  detail="Needs a restock soon"
                  icon="!"
                  iconClass="low-icon"
                />
                <MetricCard
                  label="Inventory value"
                  value={`$${totals.inventoryValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  detail="Based on current quantities"
                  icon="$"
                  iconClass="value-icon"
                />
              </section>

              <StockDistribution items={items} totalUnits={totals.units} />

              <section
                className="quick-actions"
                aria-label="Operational detail buttons"
              >
                {detailViews.map((view) => (
                  <button
                    key={view}
                    className="action-card"
                    onClick={() => setActiveView(view)}
                  >
                    <span className="action-card-icon">→</span>
                    <strong>{view}</strong>
                    <small>{detailContent[view].summary}</small>
                  </button>
                ))}
              </section>
            </>
          ) : (
            <>
              <section className="metrics" aria-label="Inventory summary">
                <MetricCard
                  label="Total products"
                  value={totals.products}
                  detail="Unique items in catalog"
                  icon="#"
                  iconClass="products-icon"
                />
                <MetricCard
                  label="Units in stock"
                  value={totals.units.toLocaleString()}
                  detail="Across all products"
                  icon="▤"
                  iconClass="units-icon"
                />
                <MetricCard
                  label="Low stock items"
                  value={totals.lowStock}
                  detail="Needs a restock soon"
                  icon="!"
                  iconClass="low-icon"
                />
                <MetricCard
                  label="Inventory value"
                  value={`$${totals.inventoryValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  detail="Based on current quantities"
                  icon="$"
                  iconClass="value-icon"
                />
              </section>

              <section className="inventory-panel">
                <div className="panel-heading">
                  <div>
                    <h2>All products</h2>
                    <p>
                      Showing {visibleItems.length} of {items.length} products
                    </p>
                  </div>
                  <button
                    className="more-button"
                    title="Export inventory"
                    aria-label="Export inventory"
                    onClick={exportCsv}
                  >
                    ···
                  </button>
                </div>

                <div className="toolbar">
                  <label className="search-box">
                    <span className="search-icon" aria-hidden="true" />
                    <input
                      type="search"
                      placeholder="Search by name, ID, category..."
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </label>
                  <div className="filters">
                    <select
                      aria-label="Filter by status"
                      value={statusFilter}
                      onChange={(event) => {
                        setStatusFilter(event.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option>All status</option>
                      <option>In stock</option>
                      <option>Low stock</option>
                      <option>Out of stock</option>
                    </select>
                    <select
                      aria-label="Filter by category"
                      value={categoryFilter}
                      onChange={(event) => {
                        setCategoryFilter(event.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option>All categories</option>
                      {categories.map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            aria-label="Select all products"
                            onChange={(event) =>
                              document
                                .querySelectorAll(".row-checkbox")
                                .forEach((checkbox) => {
                                  checkbox.checked = event.target.checked;
                                })
                            }
                          />
                        </th>
                        <th>PRODUCT</th>
                        <th>ID</th>
                        <th>CATEGORY</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>STATUS</th>
                        <th aria-label="Actions" />
                      </tr>
                    </thead>
                    <tbody>
                      {pageItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <input
                              className="row-checkbox"
                              type="checkbox"
                              aria-label={`Select ${item.name}`}
                            />
                          </td>
                          <td>
                            <div className="product-cell">
                              <span
                                className={`product-thumb thumb-${item.category.toLowerCase()}`}
                              >
                                <img
                                  src={getProductImage(item)}
                                  alt=""
                                  loading="lazy"
                                  onError={(event) => {
                                    event.currentTarget.hidden = true;
                                  }}
                                />
                                <span aria-hidden="true">
                                  {item.name
                                    .split(" ")
                                    .map((part) => part[0])
                                    .join("")
                                    .slice(0, 2)}
                                </span>
                              </span>
                              <strong>{item.name}</strong>
                            </div>
                          </td>
                          <td className="id-cell">{item.id}</td>
                          <td>
                            <span className="category-tag">
                              {item.category}
                            </span>
                          </td>
                          <td className="price-cell">
                            ${Number(item.price).toFixed(2)}
                          </td>
                          <td>
                            <span className="quantity-cell">
                              {item.quantity}
                              <small> units</small>
                            </span>
                          </td>
                          <td>
                            <StatusBadge status={getStatus(item.quantity)} />
                          </td>
                          <td>
                            <div className="row-actions">
                              <button
                                title="Edit product"
                                aria-label={`Edit ${item.name}`}
                                onClick={() => setDialogItem(item)}
                              >
                                ✎
                              </button>
                              <button
                                title="Delete product"
                                aria-label={`Delete ${item.name}`}
                                onClick={() => deleteItem(item.id)}
                              >
                                ×
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {visibleItems.length === 0 && (
                        <tr>
                          <td className="empty-state" colSpan="8">
                            No products match your search. Try changing the
                            filters or add a product.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <footer className="table-footer">
                  <span>
                    Showing{" "}
                    <strong>
                      {firstVisibleItem}–{lastVisibleItem}
                    </strong>{" "}
                    of <strong>{visibleItems.length}</strong> products
                  </span>
                  <div>
                    <button
                      disabled={displayedPage === 1}
                      onClick={() => setCurrentPage(displayedPage - 1)}
                    >
                      Previous
                    </button>
                    <button className="current-page" aria-current="page">
                      {displayedPage}
                    </button>
                    <button
                      disabled={displayedPage === pageCount}
                      onClick={() => setCurrentPage(displayedPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                </footer>
              </section>
            </>
          )}

          <footer className="page-footer">
            <span>Stockroom inventory</span>
            <span>
              Product status updates automatically · Low stock is 10 units or
              fewer
            </span>
          </footer>
        </div>
      </main>

      {dialogItem && (
        <ProductDialog
          item={dialogItem}
          categories={categories}
          suppliers={suppliers}
          isEditing={Boolean(dialogIsEditing)}
          onClose={() => setDialogItem(null)}
          onSave={saveItem}
        />
      )}
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
    </div>
  );
}

export default App;
