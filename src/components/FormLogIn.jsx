import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../fb.js';
import { useNavigate } from 'react-router-dom';
import styles from '../components/login.module.css'

function FormLogIn(){

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;

            navigate("/profile");
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
                <h3> Inicia sesión:</h3>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" title="Debe tener al menos 6 caracteres" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button type="submit" className="marcar">Acceder</button>
                </form>
            </div>
        </div>
        </>
    )
}


export default FormLogIn;