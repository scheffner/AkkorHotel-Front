import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/Navbar.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import AdminDashboard from './pages/AdminDasboard.js';
import ProfilePage from './pages/ProfilePage.js';
import HotelPage from './pages/HotelPage.js';

function App() {
    return (
        <>
            <NavBar />
            <section>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin-center" element={<AdminDashboard />} />
                    <Route path="/profile/:userId" element={<ProfilePage />} />
                    <Route path="/hotel/:hotelId" element={<HotelPage />} />
                </Routes>
            </section>
        </>
    );
}

export default App;

// Fais moi un page d'accueil avec un bouton login en haut a droite du header, ce bouton ouvre un modal avec un formulaire de login et un formulaire d'inscription (avec un bouton pour switcher entre les deux) et un bouton pour fermer le modal
// Le formulaire de login doit avoir un champ email et un champ password
// Le formulaire d'inscription doit avoir un champ username, email, un champ password
// Les deux formulaires doivent avoir un bouton pour submit
// Le modal doit avoir un bouton pour fermer le modal
// Le modal doit avoir un bouton pour switcher entre les deux formulaires
// Le modal doit avoir un bouton pour submit le formulaire
// }

// export default App;
