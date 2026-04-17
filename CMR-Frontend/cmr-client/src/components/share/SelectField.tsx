"use client";

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export default function SelectField({
  options,
  value,
  ...props
}: SelectFieldProps) {
  return (
    <select
      {...props}
      value={value ?? ""}   // ✅ FIX: never allow null/undefined
      className="
        w-full
        border
        rounded-lg
        px-3
        py-2
        text-sm
        bg-white
        focus:ring-2
        focus:ring-blue-300
        outline-none
      "
    >
      <option value="">Select</option>

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
