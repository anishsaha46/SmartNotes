import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { useNoteStore } from "../../store/noteStore";
import NoteCard from "./NoteCard";
import { Plus,Search,Star } from "lucide-react";
import Button from "../ui/Button";
import { useEffect } from "react";


const NoteList: React.FC=()=>{
    const {notes,fetchNotes,loading}=useNoteStore();
    const [searchTerm,setSearchTerm]=useState('');
    const [showFavoritesOnly,setShowFavoritesOnly]=useState(false);

    useEffect(()=>{
        fetchNotes();
    },[fetchNotes]);

    const filteredNotes=notes.filter(note=>{
        const matchesSearch= note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag=>tag.toLowerCase().includes(searchTerm.toLowerCase()));

        return setShowFavoritesOnly
        ? matchesSearch && note.is_Favorite
        : matchesSearch;
    });
}