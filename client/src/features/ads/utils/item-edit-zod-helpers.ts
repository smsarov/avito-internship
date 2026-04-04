import { z } from "zod";

export function omitEmpty(v: unknown): unknown {
  if (v === "" || v === null || v === undefined) return undefined;
  if (typeof v === "number" && !Number.isFinite(v)) return undefined;
  if (typeof v === "string") {
    const t = v.trim();
    return t === "" ? undefined : t;
  }
  return v;
}

export const str = () => z.preprocess(omitEmpty, z.string().min(1).optional());
export const en = (values: readonly [string, ...string[]]) =>
  z.preprocess(omitEmpty, z.enum(values).optional());
export const pint = () => z.preprocess(omitEmpty, z.number().int().positive().optional());
export const pnum = () => z.preprocess(omitEmpty, z.number().positive().optional());
