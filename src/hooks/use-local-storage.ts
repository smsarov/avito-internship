import { useMemo } from "react";

export function useLocalStorage() {
  return useMemo(
    () => ({
      read<T>(key: string, fallback?: T): T | undefined {
        try {
          const raw = localStorage.getItem(key);
          if (raw === null) return fallback;
          return JSON.parse(raw) as T;
        } catch {
          return fallback;
        }
      },

      write<T>(key: string, value: T): void {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch {}
      },

      clear(key: string): void {
        try {
          localStorage.removeItem(key);
        } catch {}
      },
    }),
    [],
  );
}
