import React, { useEffect, useState } from 'react'
import {
  Calendar,
  Layout,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  message,
} from 'antd'
import { getOffSchedule, insertOffSchedule } from '../../services/OffSchedule'
import { createOffSchedule } from '../../models/type'

const ManagerSchedule: React.FC = () => {
  const [offSchedules, setOffSchedules] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const userDataString = localStorage.getItem('userData')
  const userData = userDataString ? JSON.parse(userDataString) : null
  const [isCreate, setIsCreate] = useState(false)
  const fetchOffSchedule = async () => {
    try {
      const schedule = await getOffSchedule({
        StylistId: userData?.actorId,
        BranchId: '',
        GetBy: 2,
        DelFlg: true,
      })
      setOffSchedules(schedule)
    } catch (error) {
      console.error('Failed to fetch off schedule:', error)
    }
  }

  const handleInsertOffSchedule = async (offSchedule: createOffSchedule) => {
    try {
      await insertOffSchedule(offSchedule)
      fetchOffSchedule()
    } catch (error) {
      console.log(offSchedule)
      console.error('Failed to insert off schedule:', error)
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    setIsCreate(true)
    try {
      const values = await form.validateFields()
      const offSchedule: createOffSchedule = {
        offDate: values.offDate.format('YYYY-MM-DD'),
        offSlot: values.offSlot,
        stylistId: userData?.actorId,
      }
      const res = await handleInsertOffSchedule(offSchedule)
      console.log(res)
      message.success('Tạo lịch nghỉ thành công !')

      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Xảy ra lỗi trong lúc tạo lịch nghỉ')
      console.error('Validation Failed:', error)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const isDateValid = (date: any) => {
    const today = new Date()
    const fiveDaysLater = new Date(today.setDate(today.getDate() + 5))
    return date.isAfter(fiveDaysLater)
  }

  const handleDisplaySlotOff: { [key: number]: string } = {
    1: '8h-13h',
    2: '13h-18h',
  }

  const dateCellRender = (value: any) => {
    const dateString = value.format('YYYY-MM-DD')
    const slots = offSchedules.filter(
      (schedule) =>
        new Date(schedule.offDate).toISOString().split('T')[0] === dateString
    )

    return slots.length > 0 ? (
      <div className="flex flex-col items-center justify-center">
        {slots.map((schedule) => (
          <Tag className="my-1" color="red" key={schedule.offSlot}>
            Nghỉ {handleDisplaySlotOff[schedule.offSlot]}
          </Tag>
        ))}
      </div>
    ) : null
  }

  const onSelect = (date: any) => {
    const selectedDate = date.format('YYYY-MM-DD')
    const slots = offSchedules.filter(
      (schedule) =>
        new Date(schedule.offDate).toISOString().split('T')[0] === selectedDate
    )
    console.log('Selected Date:', selectedDate, 'Slots:', slots)
  }

  useEffect(() => {
    fetchOffSchedule()
  }, [])

  return (
    <Layout className="min-h-full">
      <Calendar dateCellRender={dateCellRender} onSelect={onSelect} />
      <Button type="primary" onClick={showModal}>
        Thêm lịch nghỉ
      </Button>

      <Modal
        title="Insert Off Schedule"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="offDate"
            label="Off Date"
            rules={[
              { required: true, message: 'Vui lòng nhập ngày nghỉ' },
              {
                validator: (_, value) =>
                  isDateValid(value)
                    ? Promise.resolve()
                    : Promise.reject('Bạn phải đăng ký lịch nghỉ trước 5 ngày'),
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="offSlot"
            label="Off Slot"
            rules={[{ required: true, message: 'Vui lòng chọn giờ nghỉ' }]}
          >
            <Select>
              <Select.Option value={1}>8h-13h</Select.Option>
              <Select.Option value={2}>13h-18h</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

export default ManagerSchedule
