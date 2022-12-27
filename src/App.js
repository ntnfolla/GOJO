import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Public from './components/Public';
import login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import HousesList from './features/houses/HousesList';
import UsersList from './features/users/UsersList';

function App() {
    return (
        <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Public />} />
            <Route path="login" element={<Login />} />

            <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />

                <Route path="houses">
                    <Route index element={<HousesList />} />
                </Route>
              
                <Route path="users">
                    <Route index element={<UsersList />} />
                </Route>
                
            </Route>{/* End Dash */}
            
        </Route>
        </Routes>
    );
}

export default App;
