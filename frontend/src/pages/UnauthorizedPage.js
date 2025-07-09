import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: 'center' }}>
        <ErrorOutlineIcon 
          color="error" 
          sx={{ fontSize: 80, mb: 2 }} 
        />
        
        <Typography variant="h4" gutterBottom>
          Access Denied
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          {user ? (
            `Sorry ${user.first_name || user.username}, you don't have permission to access this page.`
          ) : (
            'You need to be logged in to access this page.'
          )}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {user ? (
            <>
              <Button 
                variant="outlined" 
                onClick={handleGoBack}
                sx={{ mr: 2 }}
              >
                Go Back
              </Button>
              <Button 
                variant="contained" 
                onClick={handleGoHome}
              >
                Go to Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/login')}
                sx={{ mr: 2 }}
              >
                Login
              </Button>
              <Button 
                variant="contained" 
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </>
          )}
        </Box>

        {user && (
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="text" 
              color="error"
              onClick={logout}
            >
              Logout and try another account
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default UnauthorizedPage;