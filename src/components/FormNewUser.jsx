import { useState } from "react";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../fb';
import { useNavigate } from 'react-router-dom';
import styles from '../components/login.module.css'

function FormNewUser(){

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            
            const urlApi= import.meta.env.VITE_APP_API_URL + 'createUser';
            await fetch(urlApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, uid: user.uid })
            });

            navigate("/profile")
            setEmail('');
            setPassword('');
            setError(null);
        }
        catch(err){
            console.log(err);
            setError(err)
        }
    }


    return(
        <>
        <div className={styles.sectionlogin}>
            <div className={styles.flotante}>
                <h3> Crea una cuenta:</h3>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                
                    <button type="submit" className="marcar">Acceder</button>
                </form>
                
            </div>
        </div>
        </>
    )
}

export default FormNewUser;