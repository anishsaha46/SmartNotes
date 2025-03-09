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
    const [showFavorites,setShowFavorites]=useState(false);

    useEffect(()=>{
        fetchNotes();
    },[fetchNotes]);
}