import { twMerge } from "tailwind-merge";

export function responsive({
  base = "",
  sm = "",
  md = "",
  lg = "",
  xl = "",
}: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}) {
  return twMerge(
    ...base
      .trim()
      ?.split(" ")
      .map((cls) => cls),
    ...sm
      .trim()
      ?.split(" ")
      .map((cls) => `sm:${cls}`),
    ...md
      .trim()
      ?.split(" ")
      .map((cls) => `md:${cls}`),
    ...lg
      .trim()
      ?.split(" ")
      .map((cls) => `lg:${cls}`),
    ...xl
      .trim()
      ?.split(" ")
      .map((cls) => `xl:${cls}`)
  );
}
