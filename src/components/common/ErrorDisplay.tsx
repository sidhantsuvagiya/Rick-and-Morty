import React from "react";

type ErrorDisplayProps = {
    error: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => (
    <div className="flex items-center justify-center p-8">
        <p className="text-red-500 font-medium">{error}</p>
    </div>
);

export default ErrorDisplay;
