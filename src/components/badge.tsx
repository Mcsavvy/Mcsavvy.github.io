import { twMerge } from "tailwind-merge";

const variants = {
  primary: "text-[#ffdb70] ring-[#ffdb70]",
};

export default function Badge({
  children,
  className,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
}) {
  return (
    <span
      className={twMerge(
        "inline-flex items-center rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
