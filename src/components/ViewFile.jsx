import { useLocation } from "react-router-dom";

export default function ViewFile() {
  const location = useLocation();
  const row = location.state;

  if (!row) return <p className="text-center text-gray-500 mt-8">No data provided.</p>;

  return (
    <div className="max-w-xl mx-auto mt-4 sm:mt-20 md:mt-20 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Details for <span className="text-primary-600">{row.orderId || row.productId || row.id}</span>
      </h2>
      <ul className="divide-y divide-gray-200">
        {Object.entries(row).map(([key, value]) => (
          <li key={key} className="py-3 flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-gray-700 w-32 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            <span className="text-gray-600 break-all mt-1 sm:mt-0 sm:ml-2">{String(value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
