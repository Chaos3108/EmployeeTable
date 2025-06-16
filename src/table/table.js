import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";
const ITEMS_PER_PAGE = 10;

const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
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
    getData();
  }, []);

  // Calculate paginated data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ width: "100%" }}>
      <table>
        <thead className="table-header">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "10px" , textAlign: "center" }}>
        <button
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span
          onClick={() => handlePageClick(currentPage)}
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {currentPage}
        </span>
        <button
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
