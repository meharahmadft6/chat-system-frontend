import api from "./api";

// Get student by ID
export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch student:", error);
    throw error;
  }
};
