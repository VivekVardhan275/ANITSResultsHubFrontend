
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const nonSubjectKeys = ["rollno", "sgpa", "cgpa", "section", "roll_no"];

const knownSubjects: { [key: string]: string } = {
    datastructures: "Data Structures",
    theoryofcomputation: "Theory Of Computation",
    computernetworks: "Computer Networks",
    operatingsystems: "Operating Systems",
    probabilityandstatist: "Probability and Statistics",
    javaprogrammingpracti: "Java Programming Practice",
    datastructureslab: "Data Structures Lab",
    computernetwo: "Computer Networks", 
    logicalreasoning: "Logical Reasoning",
    financialliteracy: "Financial Literacy",
};

export const formatSubjectName = (subjectKey: string): string => {
    const cleanedKey = subjectKey.toLowerCase().replace(/_grad$/, '');
    
    if (knownSubjects[cleanedKey]) {
        return knownSubjects[cleanedKey];
    }
    
    // Fallback for unknown subjects
    return cleanedKey
        .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
        .replace(/_/g, ' ') // Replace underscores with spaces
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};


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

export const uploadResultsFile = async (file: File, batch: string, semester: string, branch: string): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('batch', batch);
    formData.append('semester', semester);
    formData.append('branch', branch);

    try {
        const response = await axios.post(`${backendUrl}/api/admin/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data.message || `File upload failed. Status: ${response.status}`);
        }
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || `An error occurred during the file upload. Status: ${error.response.status}`);
        }
        throw new Error(error.message || 'An unknown error occurred during file upload.');
    }
};
