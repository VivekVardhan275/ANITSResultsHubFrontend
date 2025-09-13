
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const getStudentDetails = async (rollNo: string, department: string): Promise<any> => {
    const params = new URLSearchParams({
        roll_no: rollNo,
        department: department,
    }).toString();

    try {
        const response = await axios.get(`${backendUrl}/api/admin/student/get-student?${params}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data.message || `Failed to fetch student details. Status: ${response.status}`);
        }
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || `An error occurred during the API request. Status: ${error.response.status}`);
        }
        throw new Error(error.message || 'An unknown error occurred.');
    }
};
