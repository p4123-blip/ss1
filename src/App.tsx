import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import About from '@/pages/About';
import Doctors from '@/pages/Doctors';
import DoctorDetail from '@/pages/DoctorDetail';
import Locations from '@/pages/Locations';
import LocationDetail from '@/pages/LocationDetail';
import Book from '@/pages/Book';
import Contact from '@/pages/Contact';
import EyeConditions from '@/pages/EyeConditions';
import EyeConditionDetail from '@/pages/EyeConditionDetail';
import EyeTopics from '@/pages/EyeTopics';
import EyeTopicDetail from '@/pages/EyeTopicDetail';
import Admin from '@/pages/Admin';

function useHashRoute() {
  const [path, setPath] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setPath(hash || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((newPath: string) => {
    window.location.hash = newPath;
  }, []);

  return { path, navigate };
}

function App() {
  const { path, navigate } = useHashRoute();

  const renderPage = () => {
    if (path === '/') return <Home onNavigate={navigate} />;
    if (path === '/services') return <Services onNavigate={navigate} />;
    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '');
      return <ServiceDetail slug={slug} onNavigate={navigate} />;
    }
    if (path === '/about') return <About onNavigate={navigate} />;
    if (path === '/doctors') return <Doctors onNavigate={navigate} />;
    if (path.startsWith('/doctors/')) {
      const slug = path.replace('/doctors/', '');
      return <DoctorDetail slug={slug} onNavigate={navigate} />;
    }
    if (path === '/locations') return <Locations onNavigate={navigate} />;
    if (path.startsWith('/locations/')) {
      const slug = path.replace('/locations/', '');
      return <LocationDetail slug={slug} onNavigate={navigate} />;
    }
    if (path === '/eye-conditions') return <EyeConditions onNavigate={navigate} />;
    if (path.startsWith('/eye-conditions/')) {
      const slug = path.replace('/eye-conditions/', '');
      return <EyeConditionDetail slug={slug} onNavigate={navigate} />;
    }
    if (path === '/eye-topics') return <EyeTopics onNavigate={navigate} />;
    if (path.startsWith('/eye-topics/')) {
      const slug = path.replace('/eye-topics/', '');
      return <EyeTopicDetail slug={slug} onNavigate={navigate} />;
    }
    if (path === '/admin') return <Admin onNavigate={navigate} />;
    if (path === '/book') return <Book />;
    if (path === '/contact') return <Contact />;

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">404</h1>
          <p className="mt-2 text-slate-500">Page not found</p>
          <button onClick={() => navigate('/')} className="btn-primary mt-6">
            Back to Home
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#FDFBF7' }}>
      <ScrollToTop path={path} />
      <Navbar currentPath={path} onNavigate={navigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
