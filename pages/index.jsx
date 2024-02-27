import Layout from '@/layouts';
import { HeroSection, ThreeStep } from '@/components/Landing';

const Home = () => {
  return (
    <section>
      <div style={{ height: '100vh' }}>
        <HeroSection />
      </div>
      <ThreeStep />
    </section>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
