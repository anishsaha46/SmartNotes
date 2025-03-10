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

  const NoteForm:React.FC<NoteFormProps> = ({noteId})=>{
    const navigate=useNavigate();
    const { currentNote,getNoteById,createNote,updateNote,loading,error } = useNoteStore();

    const [formData,setFormData]=useState<NoteFormData>({
        title:'',
        content:'',
        tags: [],
        color: '#ffffff',
        is_favorite: false,
    });

    const [tagInput,setTagInput]=useState('');
    useEffect(()=>{
      if(noteId){
        getNoteById(noteId);
      }
    },[noteId,setTagInput]);
    useEffect(()=>{
      if(currentNote && noteId){
        setFormData({
          title: currentNote.title,
          content: currentNote.content,
          tags: currentNote.tags?? [],
          color: currentNote.color?? '#ffffff',
          is_favorite: currentNote.is_favorite?? false,
        });
      }
    },[currentNote,noteId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {name,value}=e.target;
      setFormData(prev => ({...prev,[name]:value}));
    }

    const handleColorChange=(color:string)=>{
      setFormData(prev => ({...prev,color}));
    }

    const toogleFavorite=()=>{
      setFormData(prev => ({...prev,is_favorite:!prev.is_favorite}));
    };


  }