import NavbarSTARX from './components/Navbar';
import HeroSection from './components/Herosection';
import SimulatorsSection from './components/Cards';
import TeamSection from './components/Team';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <NavbarSTARX />
      <HeroSection />
      <SimulatorsSection />
      <TeamSection />
      <Footer />
    </div>
  );
}

export default App;