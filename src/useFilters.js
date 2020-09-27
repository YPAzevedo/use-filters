import { useState } from "react";

export default function useFilters(shape) {
  const [filters, setFilters] = useState(shape);

  const filtersKeys = Object.keys(filters);

  const toggle = (key) => (value) => {
    if (filters[key].includes(value)) {
      return filters[key].filter((item) => item !== value);
    }
    return [...filters[key], value];
  };

  const updaterFactory = (key) => (value) => {
    setFilters({
      ...filters,
      [key]: Array.isArray(filters[key]) ? toggle(key)(value) : value
    });
  };

  const updaterBuild = (filters) => {
    return filtersKeys.reduce((updaterObject, key) => {
      return {
        ...updaterObject,
        [`${key}Updater`]: updaterFactory(key)
      };
    }, {});
  };

  return {
    filters,
    updaters: updaterBuild(filters)
  };
}
