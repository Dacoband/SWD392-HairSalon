import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom' // Import useLocation
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons' // Import Ant Design icons
import { successPayment, cancelPayment } from '../../services/Payment' // Import the payment functions
import { Link } from 'react-router-dom'

const BookSucssess = () => {
  const [orderInfo, setOrderInfo] = useState({
    code: '',
    id: '',
    cancel: false,
    status: 'CANCELLED',
    orderCode: '',
  })

  const location = useLocation() // Get the location object

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const code = queryParams.get('code')
    const id = queryParams.get('id')
    const cancel = queryParams.get('cancel') === 'true' // Convert to boolean
    const status = queryParams.get('status') || 'CANCELLED' // Default to 'CANCELLED'
    const orderCode = queryParams.get('orderCode')

    // Set all the information in the state
    setOrderInfo({
      code: code || '',
      id: id || '',
      cancel,
      status,
      orderCode: orderCode || '',
    })

    // Call the appropriate payment function based on status
    if (status === 'PAID') {
      successPayment(id!, status) // Call successPayment
        .then((response) => {
          console.log('Payment successful:', response)
        })
        .catch((error) => {
          console.error('Error processing successful payment:', error)
        })
    } else {
      cancelPayment(id!, status, code!, String(cancel), orderCode!) // Call cancelPayment
        .then((response) => {
          console.log('Payment canceled:', response)
        })
        .catch((error) => {
          console.error('Error processing canceled payment:', error)
        })
    }
  }, [location.search])

  return (
    <div
      className={`flex items-center justify-center flex-col h-screen bg-gray-50`}
    >
      <div
        className={`flex items-center justify-center p-8 ${
          orderInfo.status === 'PAID' ? 'bg-green-100' : 'bg-red-100'
        } rounded shadow-lg`}
      >
        {/* New conditional rendering for payment status */}
        {orderInfo.status === 'PAID' ? (
          <div className="text-green-500 flex items-center text-2xl">
            <CheckCircleOutlined className="mr-4" /> {/* Success icon */}
            <span> Thanh toán thành công</span>
          </div>
        ) : (
          <div className="text-red-500 flex items-center text-2xl">
            <CloseCircleOutlined className="mr-4" /> {/* Error icon */}
            <span> Thanh toán thất bại</span>
          </div>
        )}
      </div>
      <Link to="/manage-appointments">
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Xem lịch hẹn
        </button>
      </Link>
    </div>
  )
}

export default BookSucssess