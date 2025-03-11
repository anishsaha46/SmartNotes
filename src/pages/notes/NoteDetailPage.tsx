import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useNoteStore } from '../../store/noteStore';
import { format } from 'date-fns';
import { ArrowLeft, Edit, Trash2, Star } from 'lucide-react';
import Button from '../../components/ui/Button';

const NoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentNote, getNoteById, deleteNote, toggleFavorite, loading } = useNoteStore();
  
  useEffect(() => {
    if (id) {
      getNoteById(id);
    }
  }, [id, getNoteById]);
  
  const handleDelete = async () => {
    if (id && confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
      navigate('/notes');
    }
  };
  
  const handleToggleFavorite = async () => {
    if (id) {
      await toggleFavorite(id);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!currentNote) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">Note not found</p>
          <Link to="/notes">
            <Button variant="outline">
              <ArrowLeft size={18} className="mr-1" />
              Back to notes
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/notes" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={18} className="mr-1" />
          Back to notes
        </Link>
      </div>
      
      <div 
        className={`bg-white rounded-lg shadow-md p-6 mb-6 ${
          currentNote.color ? '' : 'border border-gray-200'
        }`}
        style={currentNote.color ? { backgroundColor: currentNote.color } : {}}
      >
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{currentNote.title}</h1>
          <button 
            onClick={handleToggleFavorite}
            className="text-yellow-500 hover:text-yellow-600 focus:outline-none"
          >
            <Star fill={currentNote.is_favorite ? 'currentColor' : 'none'} size={20} />
          </button>
        </div>
        
        <div className="text-sm text-gray-500 mb-6">
          Last updated: {format(new Date(currentNote.updated_at), 'MMMM d, yyyy h:mm a')}
        </div>
        
        <div className="prose max-w-none mb-6 whitespace-pre-wrap">
          {currentNote.content}
        </div>
        
        {currentNote.tags && currentNote.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {currentNote.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-3">
        <Link to={`/notes/edit/${currentNote.id}`}>
          <Button variant="outline">
            <Edit size={18} className="mr-1" />
            Edit
          </Button>
        </Link>
        <Button 
          variant="danger"
          onClick={handleDelete}
        >
          <Trash2 size={18} className="mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default NoteDetailPage;