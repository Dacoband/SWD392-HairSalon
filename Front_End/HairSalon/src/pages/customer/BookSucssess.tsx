import React, { useState } from 'react'
import {
  Appointment,
  Branches,
  Services,
  Stylish,
  UserInfoData,
} from '../../models/type'
import { Button, Row, Col } from 'antd'

const BookSucssess = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }
  const formatDuration = (duration: number) => {
    if (duration > 60) {
      const hours = Math.floor(duration / 60)
      const minutes = duration % 60
      return minutes > 0 ? `${hours} giờ ${minutes} phút` : `${hours} giờ`
    }
    return `${duration} phút`
  }
  const appointmentData: Appointment = {
    appointmentId: 'APPT12345',
    customerId: 'CUST67890',
    stylistId: 'STYLIST123',
    status: 1, // Assuming 1 represents a certain status (e.g., Created)
    totalPrice: 100.0,
    insDate: '2024-11-06T08:00:00Z', // ISO 8601 date string
    upDate: '2024-11-06T10:00:00Z',
    startTime: '2024-11-06T09:00:00Z',
    endTime: '2024-11-06T10:30:00Z',
    sevicesList: [
      {
        serviceId: 'SERV001',
        appointmentId: 'APPT12345',
        unitPrice: 50.0,
      },
      {
        serviceId: 'SERV002',
        appointmentId: 'APPT12345',
        unitPrice: 50.0,
      },
    ],
  }
  // Services interface data
  const servicesData: Services[] = [
    {
      serviceID: 'SERV001',
      serviceName: 'Haircut',
      price: 30,
      description: 'A classic haircut service',
      duration: 60,
      avatarImage: null,
      updDate: new Date('2024-11-06T12:00:00Z'),
    },
    {
      serviceID: 'SERV002',
      serviceName: 'Hair Coloring',
      price: 80,
      description: 'Premium hair coloring service',
      duration: 120,
      avatarImage: 'https://example.com/image.jpg',
      updDate: new Date('2024-11-06T12:00:00Z'),
    },
  ]

  // Branches interface data
  const branchData: Branches = {
    branchID: 'BR001',
    staffManagerID: 'MGR123',
    salonBranches: 'Downtown Salon',
    address: '123 Main St, Cityville',
    phone: '+123456789',
    insDate: new Date('2024-11-05T08:30:00Z'),
    upDate: new Date('2024-11-06T09:00:00Z'),
    delFlg: false,
  }
  // UserInfoData interface data
  const customerData: UserInfoData = {
    Email: 'customer@example.com',
    Password: 'password123',
    MemberName: 'Jane Doe',
    DateOfBirth: '1990-07-15',
    PhoneNumber: '+987654321',
    Address: '789 Elm St, Townsville',
    avatarImage: 'https://example.com/avatar.jpg',
  }

  // Stylish interface data
  const stylistData: Stylish = {
    branchId: 'BR001',
    stylistId: 'STY123',
    stylistName: 'John Smith',
    averageRating: 4.5,
    phoneNumber: '+123456789',
    address: '456 Oak St, Villagetown',
    avatarImage: 'https://example.com/stylist.jpg',
    insDate: new Date('2024-11-05T08:30:00Z'),
    updDate: new Date('2024-11-06T09:00:00Z'),
  }
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [branch, setBranch] = useState<Branches | null>(branchData)
  const [customer, setCustomer] = useState<UserInfoData | null>(customerData)
  const [stylist, setStylist] = useState<Stylish | null>(stylistData)
  const [service, setService] = useState<Services[] | null>(servicesData)
  return (
    <>
      <div>Book success</div>
      <div className="pb-8 flex justify-center">
        <div className="w-[50%]  ml-5 border-2 px-5 bg-slate-100  rounded-md h-fit pb-8">
          {/* title */}
          <div className="flex justify-center flex-col items-center mt-6">
            <div className="text-xl text-[#937b34] font-bold w-fit mb-2 text-center border-b-2 border-[#937b34]">
              Chi tiết lịch hẹn
            </div>
            <Row className="text-sm">
              <Col>
                <b>Địa chỉ</b>
              </Col>
              <Col> {branch?.address}</Col>
            </Row>
            <div className="text-sm">
              <b>Tổng thời gian</b>:{' '}
              {formatDuration(
                service!.reduce((total, service) => total + service.duration, 0)
              )}
            </div>
            <div className="text-sm">
              <b>Stylist</b>: {stylist?.stylistName}
            </div>
          </div>

          {/* service */}
          <div className="mt-16">
            {
              <>
                {service?.map((service) => (
                  <div
                    key={service.serviceID}
                    className="mb-2 flex justify-between"
                  >
                    <span className="text-base font-bold">
                      {service.serviceName}:
                    </span>
                    <span className="text-base ml-2 flex">
                      <span>{formatCurrency(service.price)} VND</span>
                    </span>
                  </div>
                ))}
                <hr className="my-4" />
                <div className="flex justify-between text-base">
                  <span className="font-bold ">Tổng tiền:</span>
                  <span>
                    {formatCurrency(
                      service!.reduce(
                        (total, service) => total + service.price,
                        0
                      )
                    )}
                    VNĐ
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="font-bold ">Tổng thời gian:</span>
                  <span>
                    {formatDuration(
                      service!.reduce(
                        (total, service) => total + service.duration,
                        0
                      )
                    )}
                  </span>
                </div>
              </>
            }
          </div>
          {/* action */}
          <div className="flex justify-center">
            {appointment?.status === 1 ? null : (
              <Button
                type="primary"
                className={`py-5 rounded-full bg-black font-medium text-base  mt-8 ${
                  service?.length === 0 ? 'opacity-80 cursor-not-allowed' : ''
                }`}
                disabled={appointment?.status === 1}
                // onClick={handleConfirm}
              >
                Thanh toán
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default BookSucssess
