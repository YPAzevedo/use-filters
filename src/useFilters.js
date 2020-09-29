import { useState } from "react";

export default function useFilters(shape) {
  const [filters, setFilters] = useState(shape);

  const toggle = (key) => (value) => {
    if (filters[key].includes(value)) {
      return filters[key].filter((item) => item !== value);
    }
    return [...filters[key], value];
  };

  const reset = () => {
    setFilters(shape);
  };

  const makeUpdaterMethod = (key) => (value) => {
    setFilters({
      ...filters,
      [key]: Array.isArray(filters[key]) ? toggle(key)(value) : value
    });
  };

  const makeCleanerMethod = (key) => () => {
    setFilters({
      ...filters,
      [key]: Array.isArray(filters[key]) ? [] : null
    });
  };

  const makeSelectAllMethod = (key) => (items) => {
    setFilters({
      ...filters,
      [key]:
        filters[key].length === items.length ? [] : items.map((item) => item.id)
    });
  };

  const updaterBuild = (filters) => {
    return Object.entries(filters).reduce((updaterObject, [key]) => {
      return {
        ...updaterObject,
        [`${key}Updater`]: makeUpdaterMethod(key)
      };
    }, {});
  };

  const cleanerBuild = (filters) => {
    return Object.entries(filters).reduce((cleanerObject, [key]) => {
      return {
        ...cleanerObject,
        [`${key}Clear`]: makeCleanerMethod(key)
      };
    }, {});
  };

  const selectAllBuilder = (filters) => {
    return Object.entries(filters).reduce((selectAllObject, [key, value]) => {
      if (!Array.isArray(value)) return selectAllObject;
      return {
        ...selectAllObject,
        [`${key}SelectAll`]: makeSelectAllMethod(key)
      };
    }, {});
  };

  return {
    filters,
    updaters: updaterBuild(filters),
    cleaners: cleanerBuild(filters),
    selectAll: selectAllBuilder(filters),
    reset
  };
}
