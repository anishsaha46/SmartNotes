import React ,{useState} from "react";
import { useAuthStore } from "../../store/authStore";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
    type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({type}) => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [validationError,setValidationError] = useState('');
    const {signIn, signUp, loading,error } = useAuthStore();

    const validateForm = () => {
        setValidationError('');
        if(type == 'register' && password.length < 6){
            setValidationError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
        if(!validateForm()){
            return;
        }
        if(type == 'login'){
            const success=await signIn(email,password);
            if(success){
                navigate('/notes');
            }
        } else {
            const success=await signUp(email,password);
            if(success){
                navigate('/notes');
            }
        }
    }


}