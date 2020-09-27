import React from "react";
import useFilters from "./useFilters";

import "./styles.css";

var products = [
  { id: 1, name: "Prduct A" },
  { id: 2, name: "Prduct B" },
  { id: 3, name: "Prduct C" },
  { id: 4, name: "Prduct D" },
  { id: 5, name: "Prduct E" },
  { id: 6, name: "Prduct F" },
  { id: 7, name: "Prduct G" }
];

var users = [
  { id: 1, name: "User A" },
  { id: 2, name: "User B" },
  { id: 3, name: "User C" },
  { id: 4, name: "User D" },
  { id: 5, name: "User E" },
  { id: 6, name: "User F" },
  { id: 7, name: "User G" }
];

export default function App() {
  const { filters, updaters } = useFilters({
    search: "",
    startDate: "",
    endDate: "",
    users: [],
    products: []
  });

  return (
    <div className="App">
      <h1>useFilters</h1>
      <pre style={{ border: "1px solid black", padding: 10 }}>
        {JSON.stringify(filters, null, 2)}
      </pre>
      <h2>Search</h2>
      <label htmlFor="search">Search: </label>
      <input
        name="search"
        type="text"
        placeholder="Search here"
        value={filters.search}
        onChange={(e) => updaters.searchUpdater(e.target.value)}
      />
      <h2>Date Range</h2>
      <label htmlFor="startDate">Start Date: </label>
      <input
        name="startDate"
        type="date"
        value={filters.startDate}
        onChange={(e) => updaters.startDateUpdater(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="endDate">End Date: </label>
      <input
        name="endDate"
        type="date"
        value={filters.endDate}
        onChange={(e) => updaters.endDateUpdater(e.target.value)}
      />
      <h2>Users</h2>
      <ul style={{ listStyle: "none" }}>
        {users.map((user) => (
          <li key={user.id}>
            <input
              type="checkbox"
              checked={filters.users.includes(user.id)}
              onChange={() => updaters.usersUpdater(user.id)}
            />
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
      <h2>Products</h2>
      <ul style={{ listStyle: "none" }}>
        {products.map((product) => (
          <li key={product.id}>
            <input
              type="checkbox"
              checked={filters.products.includes(product.id)}
              onChange={() => updaters.productsUpdater(product.id)}
            />
            <span>{product.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
