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
}