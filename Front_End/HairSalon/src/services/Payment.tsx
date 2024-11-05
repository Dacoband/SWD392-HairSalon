import axios from 'axios'
const API_PAYMENT = 'https://api.vol-ka.studio/api/v1/Payment'
export const createPayment = async (appointmentId: string): Promise<string> => {
  try {
    const response = await axios.post<string>(
      `${API_PAYMENT}/create-payment-link`,
      { appointmentId },
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
