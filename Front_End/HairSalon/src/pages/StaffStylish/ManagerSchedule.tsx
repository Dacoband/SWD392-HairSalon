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
  ConfigProvider,
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
  const [selectDate, setSelectDay] = useState<any>(new Date(Date.now()))
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

  // const handleInsertOffSchedule = async (offSchedule: createOffSchedule) => {
  //   try {

  //     fetchOffSchedule()
  //   } catch (error) {
  //     console.log(offSchedule)
  //     console.error('Failed to insert off schedule:', error)
  //   }
  // }

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
      const res = await insertOffSchedule(offSchedule)
      if (res) {
        console.log(res)
      }
      message.success('Tạo lịch nghỉ thành công !')
      setIsModalVisible(false)
      form.resetFields()
      fetchOffSchedule()
    } catch (error) {
      message.error(error?.response?.data)
      console.error(error?.response?.data)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleSelectDate = (value: any) => {
    setSelectDay(value)
    fetchOffSchedule()
    console.log(value)
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
      <div className="flex flex-col items-start justify-start">
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
      <div className="flex justify-end mb-4">
        <Button className="w-[20%]" type="primary" onClick={showModal}>
          Thêm lịch nghỉ
        </Button>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Calendar: {
              miniContentHeight: 400,
            },
          },
        }}
      >
        <Calendar
          fullscreen={false}
          dateCellRender={dateCellRender}
          onSelect={onSelect}
          onChange={handleSelectDate}
        />
      </ConfigProvider>

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
