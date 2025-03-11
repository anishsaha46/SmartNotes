import React ,{useEffect} from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import { useNoteStore } from "../../store/noteStore";
import { format } from "date-fns";
import { ArrowLeft,Edit,Trash2,Star } from "lucide-react";
import Button from "../../components/ui/Button";

