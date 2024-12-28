import React, { useState } from 'react';

const Comments = () => {
  const [comments, setComments] = useState([
    {
      author: 'Warden',
      text: 'Your complaint is being reviewed.',
      timestamp: '2024-12-28 10:00 AM'
    },
    {
      author: 'Warden',
      text: 'Your complaint is being reviewed.',
      timestamp: '2024-12-28 10:00 AM'
    },
    {
      author: 'Warden',
      text: 'Your complaint is being reviewed.',
      timestamp: '2024-12-28 10:00 AM'
    },
    {
      author: 'Warden',
      text: 'Your complaint is being reviewed.',
      timestamp: '2024-12-28 10:00 AM'
    },
    {
      author: 'Student',
      text: 'Thank you for the update.',
      timestamp: '2024-12-28 10:30 AM'
    }
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();

    if (newComment.trim() === '') return;

    const newCommentObj = {
      author: 'Student',
      text: newComment,
      timestamp: new Date().toLocaleString(),
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  return (
    <div className="max-w-full mx-auto p-2 pb-0">
      {/* Starting Message */}
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg mb-3">
        <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold">Complaint Tracking System</h1>
        <p className="mt-2 text-sm sm:text-base">Track the progress and discussion on your complaint. View or add comments to communicate with the warden.</p>
      </div>

      {/* Container for Complaint Details and Comments */}
      <div className="bg-blue-200 p-4 sm:p-5 rounded-lg shadow-lg mb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Complaint Details Division */}
        <div className="sm:col-span-1 md:col-span-1 bg-gray-50 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Complaint Details</h2>
          <div className="space-y-2 text-sm sm:text-base">
            <div>
              <div className="font-bold">Title:</div>
              <p>Noise in the Hostel</p>
            </div>
            <div>
              <div className="font-bold">Description:</div>
              <p>The noise coming from the adjacent rooms is disturbing the residents.</p>
            </div>
            <div>
              <div className="font-bold">Image:</div>
              <img src="complaint-image.jpg" alt="Complaint" className="w-full h-32 sm:h-48 object-cover mt-2 rounded-lg" />
            </div>
            <div>
              <div className="font-bold">Date & Time:</div>
              <p>2024-12-28 09:00 AM</p>
            </div>
            <div>
              <div className="font-bold">Status:</div>
              <p>In Progress</p>
            </div>
          </div>
        </div>

        {/* Comments Section Division */}
        <div className="sm:col-span-1 md:col-span-2 bg-blue-50 p-4 rounded-lg shadow-md">
          <div className='flex justify-between rounded-lg items-center p-1 mb-2'>
            <h2 className="text-lg sm:text-xl font-semibold">Comments</h2>
            <p className='bg-blue-500 p-1 sm:p-2 rounded-2xl font-medium text-white'>21</p>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-64 sm:max-h-80">
            {comments.map((comment, index) => (
              <div key={index} className="border-b py-2 flex justify-between items-start sm:items-center">
                <div className="text-sm sm:text-base">
                  <p className="font-semibold">{comment.author}</p>
                  <p>{comment.text}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">{comment.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Input */}
          <form onSubmit={handleAddComment} className="mt-4">
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              rows="2"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white p-3 w-full rounded-lg text-sm sm:text-base"
            >
              Add Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comments;
