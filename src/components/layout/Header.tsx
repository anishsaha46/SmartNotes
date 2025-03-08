import React from "react";
import {Link,useNavigate,useLocation} from 'react-router-dom';
import { useAuthStore } from "../../store/authStore";
import {BookText,LogOut,User,Plus} from 'lucide-react';
import Button from "../ui/Button";

const Header: React.FC = () => {
    const {user,signOut,loading} = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    }; 

    const isNotesPath = location.pathname.includes('/notes');
}