import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { auth } from '../firebase/firebase';

function GalleryPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleDraw = () => {
    navigate('/drawing');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/drawing');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
        <h3>Hello {currentUser ? currentUser.email : 'Guest'}</h3>
        <button 
          onClick={handleLogout} 
          style={{
            padding: '5px 15px',
            borderRadius: '5px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}
        >
          Log Out
        </button>
      </div>
      <h1>My drawings</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
        {[...Array(6)].map((_, index) => (
          <div key={index} style={{ width: '150px', height: '150px', backgroundColor: '#f0f0f0', margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc' }}>
            <p>Artwork {index + 1}</p>
          </div>
        ))}
      </div>
      <button 
        onClick={handleDraw} 
        style={{ marginTop: '20px', padding: '10px 20px' }}
      >
        Click to Draw
      </button>
    </div>
  );
}

export default GalleryPage;
