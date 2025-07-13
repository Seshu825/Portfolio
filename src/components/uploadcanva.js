import { Upload } from "lucide-react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const UploadSymbol = () => {
  return (
    <a href="/"><div className="d-flex align-items-center justify-content-center h-20 w-20 bg-gray-200 rounded-2xl shadow-lg">
      <Upload size={40} className="text-gray-700" />
    </div>
    </a>
  );
};

export default UploadSymbol;