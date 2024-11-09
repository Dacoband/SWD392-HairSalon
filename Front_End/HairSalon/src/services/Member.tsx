import axios from "axios";
import { Member,Appointment } from "../models/type";  // Ensure correct model import

// Base URL for the API
const BASE_URL = "https://api.vol-ka.studio/api/v1";

// Function to get all members with memberId renamed to customerId
export const getAllMember = async (): Promise<Member[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/member/all`);
    // Map through the response data to replace memberId with customerId
    const modifiedData = response.data.map((member: any) => ({
      ...member,
      customerId: member.memberId,
      memberId: undefined, // Optionally remove the original memberId key
    }));
    return modifiedData;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};



// Function to fetch the member data by memberId (customerId from Appointment)
export const getMemberById = async (memberId: string): Promise<Member> => {
  const url = `https://api.vol-ka.studio/api/v1/member/${memberId}`;  
  try {
    const response = await axios.get<Member>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching member data:", error);
    throw error;  // Propagate the error for higher-level handling
  }
};

// Function to fetch appointment data
export const getAppointmentById = async (appointmentId: string): Promise<Appointment> => {
  const url = `https://api.vol-ka.studio/api/v1/appointment/${appointmentId}`;  // Fixed the URL format
  try {
    const response = await axios.get<Appointment>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment data:", error);
    throw error;  // Propagate the error for higher-level handling
  }
};

// Function to fetch appointment details along with the member's name and phone number
export const getAppointmentDetails = async (appointmentId: string) => {
  try {
    // Fetch the appointment details using the appointmentId
    const appointment = await getAppointmentById(appointmentId);

    // Fetch member details using customerId (which is memberId)
    const member = await getMemberById(appointment.customerId);  // customerId links to memberId

    // Ensure the member data exists before trying to access its properties
    if (!member) {
      throw new Error("Member not found");
    }

    // Return the appointment details along with memberName and phoneNumber
    return {
      appointment,
      memberName: member.memberName,
      phoneNumber: member.phoneNumber
    };
  } catch (error) {
    console.error("Error fetching appointment details:", error);
    throw error;
  }
};


  
// Function to fetch appointment details along with the member's name
// export const getAppointmentDetails = async (appointmentId: string) => {
//   try {
//     const appointment = await getAppointmentById(appointmentId);  // Fetch appointment
//     const member = await getMemberById(appointment.customerId);  // Fetch member using customerId (which is memberId)
//     console.log(`Appointment with ${member.memberName}`);  // Display memberName
//   } catch (error) {
//     console.error("Error fetching appointment details:", error);
//   }
// };
