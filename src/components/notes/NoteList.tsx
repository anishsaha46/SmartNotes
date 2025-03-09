import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNoteStore } from '../../store/noteStore';
import NoteCard from './NoteCard';
import { Plus, Search, Star } from 'lucide-react';
import Button from '../ui/Button';

const NoteList: React.FC = () => {
  const { notes, fetchNotes, loading } = useNoteStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return showFavoritesOnly 
      ? matchesSearch && note.is_favorite 
      : matchesSearch;
  });
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <Link to="/notes/new">
          <Button>
            <Plus size={18} className="mr-1" />
            New Note
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex items-center px-4 py-2 rounded-md border ${
            showFavoritesOnly 
              ? 'bg-yellow-50 border-yellow-200 text-yellow-700' 
              : 'border-gray-300 text-gray-700'
          }`}
        >
          <Star 
            size={18} 
            className="mr-2"
            fill={showFavoritesOnly ? 'currentColor' : 'none'}
          />
          Favorites
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">
            {searchTerm || showFavoritesOnly
              ? 'No notes match your search criteria'
              : 'You have no notes yet'}
          </p>
          <Link to="/notes/new">
            <Button variant="outline">
              <Plus size={18} className="mr-1" />
              Create your first note
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NoteList;