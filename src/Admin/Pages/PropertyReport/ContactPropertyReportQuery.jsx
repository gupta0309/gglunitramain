import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminContactReport = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchContactForms = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/all-property-ContactForm?page=${page}&limit=10`,
         {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      setContacts(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching contact forms:", error);
    }
  };

  useEffect(() => {
    fetchContactForms();
  }, [page]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Contact Form Reports</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Full Name</th>
            <th>Property Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Submitted Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contacts.length > 0 ? (
            contacts.map((item, index) => (
              <tr key={item._id}>
                <td>{(page - 1) * 10 + index + 1}</td>
                <td>{item.firstName} {item.lastName}</td>
                <td>{item.propertyName}</td>
                <td>{item.email}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.address}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() =>
                      window.location.href = `/admin/property-Report/contact-form/${item._id}`
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" align="center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminContactReport;