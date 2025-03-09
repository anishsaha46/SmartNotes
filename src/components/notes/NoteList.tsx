import { Link } from "react-router-dom";
import { useNoteStore } from "../../store/noteStore";
import NoteCard from "./NoteCard";
import { Plus,Search,Star } from "lucide-react";
import Button from "../ui/Button";


const NoteList: React.FC=()=>{
    const {notes,fetchNotes,loading}=useNoteStore();
    const [searchTerm,setSearchTerm]=useState('');
    const [showFavorites,setShowFavorites]=useState(false);
}