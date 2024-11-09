

import axios from 'axios'
import { Appointment, Stylish, CreateAppointmentRequest } from '../models/type'

const API_URL = 'https://api.vol-ka.studio/api/v1/appointment/create'
const API_APPOINTMENT = 'https://api.vol-ka.studio/api/v1/appointment'




export const createAppointment = async (
  appointment: CreateAppointmentRequest
): Promise<Appointment> => {
  try {
    const response = await axios.post<Appointment>(API_URL, appointment, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error creating appointment:', error)
    throw error
  }
}

export const getSuitableSlots = async (query: {
  stylistId: string
  serviceId: string[]
  date: Date
}): Promise<Date[]> => {
  try {
    const response = await axios.get(`${API_APPOINTMENT}/get-slot`, {
      params: {
        stylistId: query.stylistId,
        serviceId: query.serviceId,
        date: query.date.toISOString(),
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })

    return response.data // Returns a list of DateTime objects
  } catch (error) {
    console.error('Error fetching suitable slots:', error)
    throw error
  }
}

export const getAvailableStylist = async (query: {
  startTime: Date
  serviceIds: string[]
  branchId: string
}): Promise<Stylish> => {
  try {
    const response = await axios.get(
      `${API_APPOINTMENT}/get-available-stylist`,
      {
        params: {
          startTime: query.startTime.toISOString(),
          serviceIds: query.serviceIds,
          branchId: query.branchId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error fetching available stylist:', error)
    throw error
  }
}
