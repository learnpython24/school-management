// frontend/src/pages/DashboardPage.js
import { Box, Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import TeacherDashboard from '../components/dashboard/TeacherDashboard';
import ParentDashboard from '../components/dashboard/ParentDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    
    const renderDashboard = () => {
        switch(user?.role) {
            case 'STUDENT':
                return <StudentDashboard />;
            case 'TEACHER':
                return <TeacherDashboard />;
            case 'PARENT':
                return <ParentDashboard />;
            case 'ADMIN':
                return <AdminDashboard />;
            default:
                return <Typography>No dashboard available for your role.</Typography>;
        }
    };
    
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" p={2}>
                <Typography variant="h4">Welcome, {user?.username}</Typography>
                <Button variant="contained" color="error" onClick={logout}>
                    Logout
                </Button>
            </Box>
            {renderDashboard()}
        </Box>
    );
};

export default DashboardPage;