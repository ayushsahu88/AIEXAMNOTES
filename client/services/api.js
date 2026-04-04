import axios from "axios";
import { serverUrl } from "../src/App";
import { setUserData } from "../src/redux/userSlice";

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
      withCredentials: true,
    });
    dispatch(setUserData(result.data));
  } catch (error) {
    console.log(error);
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      `${serverUrl}/api/notes/generate-notes`,
      payload,
      { withCredentials: true },
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export const downloadPdf = async (resultData) => {
  try {
    const response = await axios.post(
      `${serverUrl}/api/pdf/generate-pdf`,
      { result: resultData },
      {
        responseType: "blob",
        withCredentials: true,
      },
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamNotesAI.pdf"; // ✅ correct

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    throw new Error("PDF download failed");
  }
};
