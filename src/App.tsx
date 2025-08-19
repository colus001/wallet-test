import styled from '@emotion/styled';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './About';
import Home from './Home';

// Styled components
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: #1a1a1a;
  padding: 1rem;
  color: white;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    &:hover {
      color: #646cff;
    }
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header>
          <Nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </Nav>
        </Header>
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Main>
      </AppContainer>
    </Router>
  );
}

export default App;
