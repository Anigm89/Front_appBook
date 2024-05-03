import RoutesApp from "./routes/RoutesApp";
import './App.css'; // Archivo de estilos CSS
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { LibrosProvider } from "./hooks/LibrosContext.jsx";

const App = () => {

return(
  <LibrosProvider>
    <AuthProvider>
      <RoutesApp />  
    </AuthProvider>
  </LibrosProvider>
)
  
};

export default App;
