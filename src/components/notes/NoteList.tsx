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
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 sm:mb-0">
          My Notes
          <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-2"></div>
        </h1>
        <Link to="/notes/new">
          <Button className="transform hover:-translate-y-0.5 transition-transform duration-200">
            <Plus size={18} className="mr-2" />
            New Note
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:border-gray-400"
          />
        </div>
        
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex items-center px-4 py-2.5 rounded-lg border transition-all duration-200 ${
            showFavoritesOnly 
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 border-transparent text-white shadow-md' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-sm'
          }`}
        >
          <Star 
            size={18} 
            className="mr-2 transition-transform duration-200 hover:scale-110"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl shadow-sm border border-gray-100 transition-all duration-300">
          <p className="text-gray-500 mb-6">
            {searchTerm || showFavoritesOnly
              ? 'No notes match your search criteria'
              : 'You have no notes yet'}
          </p>
          <Link to="/notes/new">
            <Button variant="outline" className="transform hover:-translate-y-0.5 transition-transform duration-200">
              <Plus size={18} className="mr-2" />
              Create your first note
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NoteList;