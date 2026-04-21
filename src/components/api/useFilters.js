import { useState, useCallback } from "react";

const DEFAULT_FILTERS = {
  month:    "",     
  category: "",
  type:     "",     
  sort:     "date",
  order:    "desc",
  search:   "",
};

export function buildQueryString(filters) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => {
    if (val) params.set(key, val);
  });
  const str = params.toString();
  return str ? `?${str}` : "";
}

export function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function useFilters(initialOverrides = {}) {
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, ...initialOverrides });

  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS, ...initialOverrides });
  }, [initialOverrides]);

  return { filters, setFilter, reset, buildQueryString };
}