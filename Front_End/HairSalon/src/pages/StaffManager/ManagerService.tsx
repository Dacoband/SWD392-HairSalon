import React, { useEffect, useState } from "react";
import axios from "axios";

interface Service {
  id: number;
  avatarImage: string;
  serviceName: string;
  price: number;
  duration: string;
  description: string;
}

const ManagerService: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(6); // Number of services to display per page

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://api.vol-ka.studio/api/v1/service/get-all"
        );
        setServices(response.data); // Ensure this aligns with the response structure
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleEdit = (id: number) => {
    console.log(`Edit service with ID: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = async (id: number) => {
    console.log(`Delete service with ID: ${id}`);
    try {
      await axios.delete(
        `https://api.vol-ka.studio/api/v1/service/delete/${id}`
      ); // Adjust URL as needed
      setServices(services.filter((service) => service.id !== id)); // Update state to remove the deleted service
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(services.length / servicesPerPage);

  // Get current services to display
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-5 overflow-hidden"> {/* Prevent scrolling */}
      <h2 className="text-2xl font-bold mb-4">Service Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Avatar</th>
              <th className="py-2 px-4 border-b">Service Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Duration</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  <img
                    src={service.avatarImage}
                    alt={service.serviceName}
                    className="w-12 h-12 "
                  />
                </td>
                <td className="h-full py-2 px-8 border-b">{service.serviceName}</td>
                <td className="py-2 px-4 border-b">${service.price}</td>
                <td className="py-2 px-4 border-b">{service.duration}</td>
                <td className="py-2 px-4 border-b">{service.description}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(service.id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManagerService;
