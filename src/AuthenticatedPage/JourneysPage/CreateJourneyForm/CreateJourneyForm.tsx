import React, { FormEvent, useRef, useState } from "react";
import { AxiosInstance } from "axios";

export const CreateJourneyForm = ({ api, onJourneysUploaded }: CreateJourneyFormProps) => {
  const file: any = useRef(null);
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file.current.files[0]) {
      return setMessage("Please select a CSV file");
    }

    try {
      const formData = new FormData();
      formData.append("file", file.current.files[0] as any, "upload.csv");

      const headers = { "Content-Type": "multipart/form-data" };
      const errors = await api.post("/journeys", formData, { headers }).then(r => r.data.data.errors);
      const newMessage = errors.length === 0 ? "Upload successful" : errors.join("\n");

      setMessage(newMessage);
      onJourneysUploaded();
    }
    catch (e) {
      setMessage("Error while uploading journeys.")
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Upload</h6>
      </div>
      <div className="card-body">
        <form className="table-responsive" onSubmit={onSubmit} style={{ maxWidth: "650px" }}>
          <p>{message}</p>
          <input type="file" name="uploadFile" ref={file}/>
          <button style={{ width: "100px", marginTop: "20px" }} type="submit" className="btn btn-primary btn-user btn-block">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

interface CreateJourneyFormProps {
  api: AxiosInstance,
  onJourneysUploaded: () => any
}
