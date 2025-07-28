import Layout from '@/components/Layout';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  return (
    <Layout>
      <LandingPage> {/* Add children here */}
        {/* Example content */}
        <div>Welcome to the Travel App</div>
      </LandingPage>
    </Layout>
  );
}