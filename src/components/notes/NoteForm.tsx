import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNoteStore } from '../../store/noteStore';
import { NoteFormData } from '../../types/note';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Star, X } from 'lucide-react';

interface NoteFormProps {
  noteId?: string;
}

const COLORS = [
  '#ffffff', // white
  '#f8fafc', // slate-50
  '#f0f9ff', // sky-50
  '#ecfeff', // cyan-50
  '#f0fdf4', // green-50
  '#fef2f2', // red-50
  '#fff7ed', // orange-50
  '#fffbeb', // amber-50
  '#fdf4ff', // fuchsia-50
];

const NoteForm: React.FC<NoteFormProps> = ({ noteId }) => {
  const navigate = useNavigate();
  const { currentNote, getNoteById, createNote, updateNote, loading, error } = useNoteStore();
  
  const [formData, setFormData] = useState<NoteFormData>({
    title: '',
    content: '',
    tags: [],
    color: '#ffffff',
    is_favorite: false,
  });
  
  const [tagInput, setTagInput] = useState('');
  
  useEffect(() => {
    if (noteId) {
      getNoteById(noteId);
    }
  }, [noteId, getNoteById]);
  
  useEffect(() => {
    if (currentNote && noteId) {
      setFormData({
        title: currentNote.title,
        content: currentNote.content,
        tags: currentNote.tags || [],
        color: currentNote.color || '#ffffff',
        is_favorite: currentNote.is_favorite,
      });
    }
  }, [currentNote, noteId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleColorChange = (color: string) => {
    setFormData(prev => ({ ...prev, color }));
  };
  
  const toggleFavorite = () => {
    setFormData(prev => ({ ...prev, is_favorite: !prev.is_favorite }));
  };
  
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags?.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...(prev.tags || []), tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (noteId) {
      await updateNote(noteId, formData);
    } else {
      await createNote(formData);
    }
    
    if (!error) {
      navigate('/notes');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {noteId ? 'Edit Note' : 'Create New Note'}
        </h1>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          {COLORS.map(color => (
            <button
              key={color}
              type="button"
              className={`w-6 h-6 rounded-full border ${formData.color === color ? 'ring-2 ring-blue-500' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
        
        <button
          type="button"
          className="flex items-center text-gray-700 hover:text-yellow-500"
          onClick={toggleFavorite}
        >
          <Star 
            fill={formData.is_favorite ? 'currentColor' : 'none'} 
            className={formData.is_favorite ? 'text-yellow-500' : ''}
          />
          <span className="ml-1">
            {formData.is_favorite ? 'Favorited' : 'Add to favorites'}
          </span>
        </button>
      </div>
      
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Note title"
        required
        fullWidth
      />
      
      <TextArea
        label="Content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Write your note here..."
        required
        fullWidth
        rows={10}
      />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags?.map(tag => (
            <span 
              key={tag} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Add tags (press Enter)"
          fullWidth
        />
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/notes')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={loading}
        >
          {noteId ? 'Update Note' : 'Create Note'}
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;