import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteCardForm = ({ refreshProducts }) => {
  const { id } = useParams(); // Get the ID from the URL
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setMessage('No card ID provided in the URL.');
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id) {
      setMessage('Card ID is missing.');
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete the card with ID: ${id}?`);
    if (!confirmDelete) return;

    setLoading(true);
    setMessage(''); // Clear any previous messages

    try {
      const response = await axios.delete(`http://localhost:3200/api/cards/${id}`);
      setMessage(`Card deleted successfully: ${response.data.name || response.data._id}`);

      if (refreshProducts) {
        await refreshProducts(); // Refresh product list if provided
      }
    } catch (error) {
      console.error('Error deleting card:', error); // Log error to console for debugging
      setMessage(
        error.response?.data?.message
          ? `Error: ${error.response.data.message}`
          : 'An error occurred while deleting the card.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-card-form">
      <h2>Delete Card</h2>
      <p>Card ID: {id}</p>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Card'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteCardForm;
