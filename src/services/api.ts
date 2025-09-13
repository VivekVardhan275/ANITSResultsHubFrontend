
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

// --- API Functions ---

/**
 * Fetches the details for a specific student.
 * @param rollNo - The roll number of the student.
 * @returns A promise that resolves to the student's details.
 */
export const getStudentDetails = async (rollNo: string): Promise<any> => {
    try {
        const response = await axios.get(`${backendUrl}/api/admin/student/get-student-details?rollNo=${rollNo}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching student details:", error);
        throw error;
    }
};


/**
 * Fetches the results for a specific semester of a student.
 * @param rollNo - The roll number of the student.
 * @param semester - The semester to fetch results for.
 * @returns A promise that resolves to the semester results.
 */
export const getSemesterResults = async (rollNo: string, semester: string): Promise<any> => {
    try {
        const params = new URLSearchParams({ rollNo, semester }).toString();
        const response = await axios.get(`${backendUrl}/api/admin/student/get-semester-results?${params}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching semester results:", error);
        throw error;
    }
};

