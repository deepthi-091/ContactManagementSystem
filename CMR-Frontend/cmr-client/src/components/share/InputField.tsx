export default function InputField({ value, ...props }: any) {
  return (
    <input
      {...props}
      value={value ?? ""}   // ✅ same fix
      className="w-full border rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-blue-300 outline-none"
    />
  );
  
}