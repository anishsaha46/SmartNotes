import React ,{useEffect} from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import { useNoteStore } from "../../store/noteStore";
import { format } from "date-fns";
import { ArrowLeft,Edit,Trash2,Star } from "lucide-react";
import Button from "../../components/ui/Button";

const NoteDetailPage:React.FC=()=>{
    const {id} =useParams<{id:string}>();
    const navigate = useNavigate();
    const {currentNote,getNoteById,deleteNote,toggleFavorite,loading}=useNoteStore();

    useEffect( ()=>{
        if(id){
            getNoteById(id);
        }
    },[id,getNoteById]);

    const handleToggleFavorite = async()=> {
        if(id){
            await toggleFavorite(id);
        }
    };

    if (loading) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        );
      }

      if (!currentNote) {
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">Note not found</p>
              <Link to="/notes">
                <Button variant="outline">
                  <ArrowLeft size={18} className="mr-1" />
                  Back to notes
                </Button>
              </Link>
            </div>
          </div>
        );
      }
}
