import { useState } from "react";


export default function BookingsTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
 
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
        width: "100%",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflow: "hidden",
      }}
      className="w-full"
    >
      {/* Title */}
      <div style={{ padding: "24px 24px 16px 24px" }}>
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#111827" }}>Bookings</h2>
      </div>

      {/* Table for desktop, hidden on mobile */}
      <div className="hidden md:block">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr className="bg-[#F8F8F8]">
              <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "14px", fontWeight: "500", color: "#6b7280", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>Name</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "14px", fontWeight: "500", color: "#6b7280", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>Phone Number</th>
              <th style={{ padding: "12px 24px", textAlign: "left", fontSize: "14px", fontWeight: "500", color: "#6b7280", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((b, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={{ padding: "20px 24px", fontSize: "14px", color: "#111827", fontWeight: "400" }}>{b.name}</td>
                <td style={{ padding: "20px 24px", fontSize: "14px", color: "#374151" }}>{b.phone}</td>
                <td style={{ padding: "20px 24px", fontSize: "14px", color: "#374151", wordBreak: "break-word" }}>{b.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile, hidden on desktop */}
      <div className="block md:hidden px-4 pb-2">
        {currentItems.map((b, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              marginBottom: "16px",
              background: "#f9fafb",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              padding: "16px 14px",
            }}
          >
            <div style={{ fontWeight: 600, color: "#0d9488", fontSize: "16px", marginBottom: "8px" }}>{b.name}</div>
            <div style={{ fontSize: "14px", color: "#374151", marginBottom: "4px" }}>
              <span style={{ fontWeight: 500 }}>Phone:</span> {b.phone}
            </div>
            <div style={{ fontSize: "14px", color: "#374151" }}>
              <span style={{ fontWeight: 500 }}>Email:</span> {b.email}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 px-4 md:px-6 pb-4 md:pb-8"
        style={{ paddingTop: "16px" }}
      >
        <span
          style={{ fontSize: "14px", color: "#0d9488", fontWeight: "500" }}
          className="text-center md:text-left"
        >
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of {data.length} results
        </span>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "500",
              color: currentPage === 1 ? "#9ca3af" : "#0d9488",
              background: "#ffffff",
              border: `1px solid ${currentPage === 1 ? "#d1d5db" : "#0d9488"}`,
              borderRadius: "8px",
              cursor: currentPage === 1 ? "default" : "pointer",
            }}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "500",
              color: currentPage === totalPages ? "#9ca3af" : "#0d9488",
              background: "#ffffff",
              border: `1px solid ${currentPage === totalPages ? "#d1d5db" : "#0d9488"}`,
              borderRadius: "8px",
              cursor: currentPage === totalPages ? "default" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
 

