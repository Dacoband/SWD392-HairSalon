import axios from 'axios'
import { createOffSchedule, offschedule } from '../models/type'

const SCHEDULE_APPOINTMENT = 'https://api.vol-ka.studio/api/v1/offschedule'

export const getOffSchedule = async (query: {
  StylistId: string
  BranchId: string
  GetBy: number
  DelFlg: boolean
}): Promise<offschedule> => {
  try {
    const response = await axios.get(`${SCHEDULE_APPOINTMENT}/get-all`, {
      params: {
        StylistId: query.StylistId,
        BranchId: query.BranchId,
        GetBy: query.GetBy,
        DelFlg: query.DelFlg,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching suitable slots:', error)
    throw error
  }
}

export const insertOffSchedule = async (
  offSchedule: createOffSchedule
): Promise<offschedule> => {
  try {
    const response = await axios.post<offschedule>(
      `${SCHEDULE_APPOINTMENT}/create`,
      offSchedule,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error creating schedule:', error)
    throw error
  }
}
