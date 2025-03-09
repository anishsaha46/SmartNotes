import React from 'react';
import {format} from 'date-fns';
import {Star,Edit,Trash2} from 'lucide-react';
import { Note } from '../../types/note';
import { useNoteStore } from '../../store/noteStore';
import { Link,useNavigate } from 'react-router-dom';

interface NoteCardProps {
    note: Note;
}
