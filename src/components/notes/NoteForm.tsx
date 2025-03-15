import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNoteStore } from '../../store/noteStore';
import { useAIStore } from '../../store/aiStore';
import { NoteFormData } from '../../types/note';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Star, X, Plus, Sparkles, FileText } from 'lucide-react';

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
  const { generateContent, summarizeContent, isGenerating, isSummarizing } = useAIStore();
  
  const [formData, setFormData] = useState<NoteFormData>({
    title: '',
    content: '',
    tags: [],
    color: '#ffffff',
    is_favorite: false,
  });
  
  const [tagInput, setTagInput] = useState('');
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAIPrompt] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
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
  
  const handleGenerate = async () => {
    if (!aiPrompt.trim()) return;
    
    const generatedContent = await generateContent(aiPrompt);
    if (generatedContent) {
      // Insert at cursor position if available, otherwise append to existing content
      if (textAreaRef.current) {
        const textArea = textAreaRef.current;
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const currentContent = formData.content;
        
        const newContent = 
          currentContent.substring(0, start) + 
          generatedContent + 
          currentContent.substring(end);
        
        setFormData(prev => ({ ...prev, content: newContent }));
      } else {
        // Fallback: append to the end
        setFormData(prev => ({ 
          ...prev, 
          content: prev.content ? `${prev.content}\n\n${generatedContent}` : generatedContent 
        }));
      }
      
      // Clear prompt and hide the prompt input
      setAIPrompt('');
      setShowAIPrompt(false);
    }
  };
  
  const handleSummarize = async () => {
    // If there's a text selection, summarize only that part
    let contentToSummarize = formData.content;
    
    if (textAreaRef.current) {
      const textArea = textAreaRef.current;
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      
      if (start !== end) {
        // There is a selection
        contentToSummarize = formData.content.substring(start, end);
      }
    }
    
    if (!contentToSummarize.trim()) return;
    
    const summary = await summarizeContent(contentToSummarize);
    if (summary) {
      // If we summarized a selection, replace it; otherwise append the summary
      if (textAreaRef.current) {
        const textArea = textAreaRef.current;
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        
        if (start !== end) {
          // Replace selection with summary
          const newContent = 
            formData.content.substring(0, start) + 
            summary + 
            formData.content.substring(end);
          
          setFormData(prev => ({ ...prev, content: newContent }));
          return;
        }
      }
      
      // Append summary at the end
      setFormData(prev => ({ 
        ...prev, 
        content: prev.content ? `${prev.content}\n\n## Summary\n${summary}` : summary 
      }));
    }
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-xl transition-all duration-300 border border-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {noteId ? 'Edit Note' : 'Create New Note'}
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-2"></div>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm animate-pulse">
          {error}
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 p-5 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
        <div className="mb-4 sm:mb-0">
          <p className="text-sm font-medium text-gray-700 mb-3">Note Color</p>
          <div className="flex flex-wrap gap-3">
            {COLORS.map(color => (
              <button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 hover:shadow-md ${formData.color === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        </div>
        
        <button
          type="button"
          className={`flex items-center px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm ${formData.is_favorite ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white hover:shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`}
          onClick={toggleFavorite}
        >
          <Star 
            fill={formData.is_favorite ? 'currentColor' : 'none'} 
            className={`mr-2 ${formData.is_favorite ? 'text-white' : ''} transition-all duration-200`}
            size={18}
          />
          {formData.is_favorite ? 'Favorited' : 'Add to favorites'}
        </button>
      </div>
      
      <div className="space-y-6">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a title for your note"
          required
          fullWidth
          className="text-lg font-medium"
        />
        
        <div className="relative">
          <TextArea
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Start writing your thoughts..."
            required
            fullWidth
            rows={12}
            className="font-mono text-base"
            ref={textAreaRef}
          />
          
          <div className="absolute right-2 top-10 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setShowAIPrompt(!showAIPrompt)}
              className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              title="Generate content with AI"
            >
              <Sparkles size={18} />
            </button>
            <button
              type="button"
              onClick={handleSummarize}
              className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              title="Summarize content with AI"
              disabled={isSummarizing || !formData.content.trim()}
            >
              <FileText size={18} />
            </button>
          </div>
          
          {showAIPrompt && (
            <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm">
              <p className="text-sm font-medium text-purple-800 mb-2">Generate content with AI</p>
              <div className="flex gap-2">
                <Input
                  value={aiPrompt}
                  onChange={(e) => setAIPrompt(e.target.value)}
                  placeholder="Enter a prompt for AI generation..."
                  fullWidth
                  className="bg-white"
                />
                <Button
                  type="button"
                  onClick={handleGenerate}
                  isLoading={isGenerating}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                  disabled={!aiPrompt.trim()}
                >
                  Generate
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tags
          </label>
          
          <div className="flex flex-wrap gap-2 mb-4 min-h-10">
            {formData.tags?.length ? formData.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-blue-50 text-blue-700 border border-blue-200 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 hover:text-blue-900 transition-colors"
                  aria-label={`Remove ${tag} tag`}
                >
                  <X size={14} />
                </button>
              </span>
            )) : (
              <p className="text-sm text-gray-500 italic">No tags added yet</p>
            )}
          </div>
          
          <div className="relative">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type a tag and press Enter"
              fullWidth
              className="bg-white pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Plus size={16} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/notes')}
          className="px-6"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={loading}
          className="px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {noteId ? 'Update Note' : 'Create Note'}
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;