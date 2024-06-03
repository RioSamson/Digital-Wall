import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { auth, db, imageDb } from '../firebase/firebase';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { collection, getDocs, getDoc } from 'firebase/firestore';


function GalleryPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [prevDrawing, setPrevDrawing] = useState([]);

  const handleDraw = () => {
    navigate('/drawing');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getDrawings = async () => {
    console.log("Fetching drawings...");

    const querySnapshot = await getDocs(collection(db, "drawing"));
    console.log("Query snapshot:", querySnapshot);
    console.log("Query snapshot size:", querySnapshot.size);
    if (querySnapshot.empty) {
        console.log("No matching documents.");
    } else {
        const drawings = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          console.log("Document data:", data);
          const dataEmail = data.email;
          
          if (dataEmail === currentUser.email) { 
            console.log("Email is:", dataEmail);
            console.log("Document email:", data.email);
            console.log("Document draw address 1:", data.drawing[0]);

            const storageRef = ref(imageDb, 'drawings/');
            const result = await listAll(storageRef);
            const urlPromises = result.items.map(itemRef => getDownloadURL(itemRef));
            const urls = await Promise.all(urlPromises);

            setPrevDrawing(urls);

          } else {
            console.log("Email is different");
          }
          

            // // Fetch the actual drawing data if it is stored as DocumentReference
            // const drawingData = await Promise.all(data.drawing.map(async (docRef) => {
            //     const drawingDoc = await getDoc(docRef);
            //     const drawingPath = drawingDoc.data().path; // Assuming the document has a 'path' field
            //     const storageReference = storageRef(imageDb, drawingPath); // Create a valid storage reference
            //     return getDownloadURL(storageReference);
            // }));
            
            // return { id: doc.id, email: data.email, drawing: drawingData };
        }));

        // console.log("Drawings array:", drawings);
        // setPrevDrawing(drawings);
    }
};

  useEffect(() => {
    getDrawings();
  }, []);

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
      {prevDrawing.length > 0 ? (
        prevDrawing.map((url, index) => (
          <div key={index} style={{ width: '150px', height: '150px', margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc' }}>
            <img src={url} alt={`Drawing ${index}`} style={{ width: '100%', height: 'auto' }} />
          </div>
        ))
      ) : (
        <p>No drawings found</p>
      )}
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
