import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getAppointmentsWithDetails } from "../../services/Admin/Appointment"; // Đường dẫn đến file API của bạn
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AppointmentChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointments = await getAppointmentsWithDetails();

        // Sắp xếp và lấy 5 giá trị `totalPrice` lớn nhất
        const topPrices = appointments
          .sort((a: any, b: any) => b.totalPrice - a.totalPrice)
          .slice(0, 5);

        // Chuẩn bị dữ liệu cho Chart.js
        const data = {
          labels: topPrices.map((appointment: any) => appointment.stylistName),
          datasets: [
            {
              label: "Top 5 Total Prices",
              data: topPrices.map((appointment: any) => appointment.totalPrice),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData ? (
        <Bar
          className="mx-20 flex justify-center"
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Top 5 Appointments by Total Price",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Tên nhà tạo mẫu",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Tổng tiền (VNĐ)",
                  font: {
                    size: 14,
                    weight: "bold",
                  },
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default AppointmentChart;
