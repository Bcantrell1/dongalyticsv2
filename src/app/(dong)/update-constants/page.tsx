'use client'

import { useState } from 'react';

export default function UpdateConstantsPage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const updateConstants = async () => {
    setIsUpdating(true);
    setMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/constants/update-constants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Success: ${data.message}. Updated ${data.updatedResources.length} resources.`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('An error occurred while updating constants.');
      console.error('Error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Update OpenDota Constants</h1>
      <button
        onClick={updateConstants}
        disabled={isUpdating}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isUpdating ? 'Updating...' : 'Update Constants'}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}