import { NavLink } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography, styled } from '@mui/material';

// Custom styled component for the AppBar
const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
});

// Custom styled component for the main title
const MainTitle = styled(Typography)({
  marginRight: '50px',  // Increased spacing after the main title
  fontFamily: 'Cursive',  // More distinct, stylized font for the main title
  fontWeight: 900,
  letterSpacing: '.5rem',
  fontSize: '1.5rem',
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#3f51b5'  // More appealing hover color
    }
  }
});

// Custom styled component for other navigation links
const NavText = styled(Typography)(({ theme }) => ({
  marginRight: '30px',  // Space between each navigation option
  fontFamily: 'sans-serif',
  fontWeight: 700,
  letterSpacing: '.3rem',
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'transform 0.2s ease-in-out, color 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
      color: '#3f51b5'  // Same hover color for consistency
    }
  },
  variant: 'h6'
}));

export default function NavBar() {
  return (
    <StyledAppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <MainTitle>
            <NavLink to='/' exact>SAFE AIRBNB LA</NavLink>
          </MainTitle>
          <NavText>
            <NavLink to='/neighborhood'>NEIGHBORHOODS</NavLink>
          </NavText>
          <NavText>
            <NavLink to='/rank'>AREA RANK</NavLink>
          </NavText>
          <NavText>
            <NavLink to='/search_listing'>SEARCH</NavLink>
          </NavText>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
