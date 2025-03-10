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