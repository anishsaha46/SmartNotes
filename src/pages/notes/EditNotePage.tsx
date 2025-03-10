import React from 'react';
import { useParams } from 'react-router-dom';
import NoteForm from '../../components/notes/NoteForm';

const EditNotePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Note ID is required</div>;
  }
  
  return <NoteForm noteId={id} />;
};

export default EditNotePage;