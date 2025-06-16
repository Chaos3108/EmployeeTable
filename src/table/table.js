import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css"; // Optional styling file

const ITEMS_PER_PAGE = 10;

const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
      } catch (error) {
        alert("failed to fetch data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, endIndex);

  // Handlers
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div style={{ padding: "20px", width: "100%", boxSizing: "border-box" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: 'green', color: 'white' }}>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.email}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{
            padding: "8px 16px",
            marginRight: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Previous
        </button>

        <span
          style={{
            padding: "8px 16px",
            marginRight: "10px",
            backgroundColor: "green",
            color: "white",
            borderRadius: "4px",
            display: "inline-block",
            fontWeight: "bold",
          }}
        >
          {currentPage}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            padding: "8px 16px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
