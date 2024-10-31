import React from 'react'

const ToastMessage = ({
    ToastMessage
}) => {
    return (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
            <span className="material-symbols-outlined mr-2">check_circle</span>
            <p>{ToastMessage}</p>
        </div>
    );
};

export default ToastMessage