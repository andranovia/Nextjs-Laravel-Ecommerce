export default function ButtonPrimary({ children, onClick, type }: any) {
  return (
    <button
      className="bg-orange-900 text-white px-9 py-2 rounded hover:bg-orange-800"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}