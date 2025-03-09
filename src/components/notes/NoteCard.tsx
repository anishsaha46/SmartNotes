import React from 'react';
import {format} from 'date-fns';
import {Star,Edit,Trash2} from 'lucide-react';
import { Note } from '../../types/note';
import { useNoteStore } from '../../store/noteStore';
import { Link,useNavigate } from 'react-router-dom';

interface NoteCardProps {
    note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
    const {toggleFavorite,deleNode}=useNoteStore();
    const navigate=useNavigate();

    const handleToggleFavorite=(e:React.MouseEvent)=>{
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(note.id);
    };

    const handleDelete=(e:React.MouseEvent)=>{
        e.preventDefault();
        e.stopPropagation();
        if(confirm("Are you sure you want to delete")){
            deleNode(note.id);
        }
    };

    const handleEdit=(e:React.MouseEvent)=>{
        e.preventDefault();
        e.stopPropagation();
        navigate('/notes/edit/${note.id}');
    };

    const handleCardClick=()=>{
        navigate(`/notes/${note.id}`);
    }

    const cardStyle = note.color 
    ? { backgroundColor: note.color, borderColor: note.color }
    : {};

  const textColor = note.color && isColorDark(note.color) 
    ? 'text-white' 
    : 'text-gray-800';

  return (
    <div 
      onClick={handleCardClick}
      className={`relative border rounded-lg shadow-sm p-4 h-full transition-all hover:shadow-md ${textColor} cursor-pointer`}
      style={cardStyle}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg truncate">{note.title}</h3>
        <button 
          onClick={handleToggleFavorite}
          className="text-yellow-500 hover:text-yellow-600 focus:outline-none"
        >
          <Star fill={note.is_favorite ? 'currentColor' : 'none'} size={18} />
        </button>
      </div>
      
      <p className="text-sm mb-4 line-clamp-3">{note.content}</p>
      
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs opacity-70">
          {format(new Date(note.updated_at), 'MMM d, yyyy')}
        </span>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleEdit}
            className="p-1 hover:bg-black/10 rounded"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={handleDelete}
            className="p-1 hover:bg-black/10 rounded text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {note.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 rounded-full bg-black/10"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

}