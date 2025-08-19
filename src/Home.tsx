import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a4a4a;
  margin-bottom: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Feature = styled.div`
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #2a2a2a;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    line-height: 1.5;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #646cff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4a51ff;
  }
`;

const Home = () => {
  return (
    <Container>
      <Title>Welcome to Wallet Test</Title>
      <Description>
        This is a testing environment for various wallet integrations and Web3
        functionalities. Explore different features and implementations to
        understand how they work.
      </Description>

      <FeaturesGrid>
        <Feature>
          <h3>Cross Chain Testing</h3>
          <p>
            Test cross-chain functionality and message signing using the Cross
            Test implementation. Perfect for understanding SIWE (Sign-In with
            Ethereum).
          </p>
          <CTAButton to="/cross-test">Try Cross Test</CTAButton>
        </Feature>

        <Feature>
          <h3>MetaMask Integration</h3>
          <p>
            Explore MetaMask wallet integration and its features. Test
            connection, transaction signing, and other wallet-specific
            functionalities.
          </p>
          <CTAButton to="/metamask-test">Try MetaMask Test</CTAButton>
        </Feature>

        <Feature>
          <h3>About the Project</h3>
          <p>
            Learn more about this testing environment, its purpose, and how to
            use it effectively for your Web3 development needs.
          </p>
          <CTAButton to="/about">Learn More</CTAButton>
        </Feature>
      </FeaturesGrid>
    </Container>
  );
};

export default Home;
