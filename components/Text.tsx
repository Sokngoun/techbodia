import { cn } from "@/lib/utils";

type TextProps = {
  title: string;
  className?: string;
};
export default function Text({ title, className }: TextProps) {
  return (
    <div>
      <h1 className={cn("font-bold text-2xl md:text-4xl w-full text-center p-2 bg-slate-800 text-white", className)}>{title}</h1>
    </div>
  );
}
