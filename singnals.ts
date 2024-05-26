import { signal } from "@preact/signals";
import { tProyect } from "./types.ts";

export const brand = signal<string>("Todas");
export const name = signal<string>("");
export const iso = signal<string>("Todas");
export const color = signal<string>("Ambos");
export const format120 = signal<string>("");
export const format35 = signal<string>("");
export const formatg = signal<string>("Todos");
