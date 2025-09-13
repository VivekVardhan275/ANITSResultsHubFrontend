
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

// Mock data to simulate API responses. Replace with actual API calls.

const allStudentsData: Record<string, any> = {
    "321126510001": {
        name: "GANDI MANIKANTA",
        department: "Computer Science & Engineering",
        section: "A",
        semesters: [
            { semester: "1-1", sgpa: "8.5", status: "Passed" },
            { semester: "1-2", sgpa: "8.8", status: "Passed" },
            { semester: "2-1", sgpa: "8.9", status: "Passed" },
        ]
    },
    "321126510002": {
        name: "IMMANUVEL",
        department: "Computer Science & Engineering",
        section: "A",
        semesters: [
            { semester: "1-1", sgpa: "8.2", status: "Passed" },
            { semester: "1-2", sgpa: "8.1", status: "Passed" },
            { semester: "2-1", sgpa: "7.5", status: "Passed" },
        ]
    },
    "321126510003": {
        name: "ADARI MAHESWARI",
        department: "Computer Science & Engineering",
        section: "A",
        semesters: [
            { semester: "1-1", sgpa: "7.9", status: "Passed" },
            { semester: "1-2", sgpa: "7.5", status: "Passed" },
            { semester: "2-1", sgpa: "6.8", status: "Failed" },
        ]
    },
};

const allResultsData: Record<string, Record<string, any>> = {
  "321126510001": {
      "1-1": { sgpa: "8.5", cgpa: "8.5", status: "Passed", results: [ { subjectCode: "MA111", subjectName: "Calculus", grade: "A" }, ] },
      "1-2": { sgpa: "8.8", cgpa: "8.65", status: "Passed", results: [ { subjectCode: "MA121", subjectName: "Differential Equations", grade: "A" }, ] },
      "2-1": { sgpa: "8.9", cgpa: "8.73", status: "Passed", results: [ { subjectCode: "CS211", subjectName: "Data Structures", grade: "A+" }, ] },
  },
  "321126510003": {
      "2-1": { sgpa: "6.8", cgpa: "7.4", status: "Failed", results: [ { subjectCode: "MA211", subjectName: "Linear Algebra", grade: "F" }, ] },
  }
};

// --- API Functions ---

/**
 * Fetches the details for a specific student.
 * @param rollNo - The roll number of the student.
 * @returns A promise that resolves to the student's details.
 */
export const getStudentDetails = async (rollNo: string): Promise<any> => {
    // In a real app, you would make an API call here.
    // For now, we simulate it with a timeout and mock data.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const studentData = allStudentsData[rollNo];
            if (studentData) {
                resolve(studentData);
            } else {
                reject(new Error("Student not found"));
            }
        }, 500);
    });

    /*
    // Example of a real API call with axios:
    try {
        const response = await axios.get(`${backendUrl}/api/admin/student/get-student-details?rollNo=${rollNo}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching student details:", error);
        throw error;
    }
    */
};


/**
 * Fetches the results for a specific semester of a student.
 * @param rollNo - The roll number of the student.
 * @param semester - The semester to fetch results for.
 * @returns A promise that resolves to the semester results.
 */
export const getSemesterResults = async (rollNo: string, semester: string): Promise<any> => {
     // In a real app, you would make an API call here.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const studentSemesters = allResultsData[rollNo];
            if (studentSemesters && studentSemesters[semester]) {
                resolve(studentSemesters[semester]);
            } else {
                reject(new Error("Semester results not found"));
            }
        }, 500);
    });

    /*
    // Example of a real API call with axios:
    try {
        const params = new URLSearchParams({ rollNo, semester }).toString();
        const response = await axios.get(`${backendUrl}/api/admin/student/get-semester-results?${params}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching semester results:", error);
        throw error;
    }
    */
};
