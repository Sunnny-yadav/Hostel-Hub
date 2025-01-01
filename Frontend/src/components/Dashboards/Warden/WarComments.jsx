import React, { useState } from 'react'

function WarComments() {
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
    <>
    <div className="sm:col-span-1 md:col-span-2 bg-blue-50 p-4 rounded-lg shadow-md">
          <div className='flex justify-between rounded-lg items-center p-1 mb-2'>
            <h2 className="text-lg sm:text-xl font-semibold">Comments</h2>
            <p className="bg-blue-500 p-1 pt-0 sm:p-2 sm:pt-1 sm:pb-1 rounded font-medium text-white">
              2
            </p>
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
    
    </>
  )
}

export default WarComments