import axios from 'axios'
import { CreatePaymentReponse } from '../models/type'
const API_PAYMENT = 'https://api.vol-ka.studio/api/Payment'
export const createPayment = async (
  appointmentId: string
): Promise<CreatePaymentReponse> => {
  try {
    const response = await axios.post<CreatePaymentReponse>(
      `${API_PAYMENT}/create-payment-link`,
      appointmentId,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error creating payment link:', error)
    throw error
  }
}

export const successPayment = async (
  appointmentId: string,
  status: string
): Promise<CreatePaymentReponse> => {
  try {
    const response = await axios.get<any>(`${API_PAYMENT}/success`, {
      params: { id: appointmentId, status },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error creating payment link:', error)
    throw error
  }
}

export const cancelPayment = async (
  appointmentId: string,
  status: string,
  code: string,
  cancel: string,
  orderCode: string
): Promise<any> => {
  try {
    const response = await axios.get<any>(`${API_PAYMENT}/cancel`, {
      params: { id: appointmentId, status, code, cancel, orderCode },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error canceling payment:', error)
    throw error
  }
}