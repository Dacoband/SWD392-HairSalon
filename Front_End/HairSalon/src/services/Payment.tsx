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
