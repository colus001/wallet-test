import styled from '@emotion/styled';
import { crossTestnet, initCrossSdk } from '@to-nexus/sdk/react';
import { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './About';
import CrossTest from './CrossTest';
import Home from './Home';
import MetaMaskTest from './MetaMaskTest';

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
  const [sdk, setSdk] = useState<ReturnType<typeof initCrossSdk> | undefined>(
    undefined
  );
  useEffect(() => {
    const _sdk = initCrossSdk(
      'ab32dee70a305921c0bbb353b321da3b',
      'http://localhost:5174',
      {
        name: 'CrossNFT',
        description: 'CrossNFT',
        url: 'https://crossnft.io',
        icons: ['https://crossnft.io/logo.png'],
      },
      'light',
      crossTestnet
    );
    setSdk(_sdk);
  }, []);

  if (!sdk) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AppContainer>
        <Header>
          <Nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/cross-test">Cross Test</Link>
            <Link to="/metamask-test">MetaMask Test</Link>
          </Nav>
        </Header>
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cross-test" element={<CrossTest />} />
            <Route path="/metamask-test" element={<MetaMaskTest />} />
          </Routes>
        </Main>
      </AppContainer>
    </Router>
  );
}

export default App;
