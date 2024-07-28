import './App.css'
import { MyInfo } from './components/@types'
import About from './components/about'
import { useFirebase } from './components/firebase'
import Header from './components/header'
import Navbar from './components/navbar'
import Projects from './components/projects'
import Sidebar from './components/sidebar'
import { useEffect, useState } from 'react'

function App() {
  const [tab, setTab] = useState('');
  const firebase = useFirebase();
  const [info, setInfo] = useState<MyInfo | null>(null);

  useEffect(() => {
    firebase.getMyInfo().then(setInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const hash = document.location.hash.replace(/^#/, '');
    setTab(hash || 'About');
  }, []);

  useEffect(() => {
    if (!tab) return;
    document.title = `David John - ${tab}`;
    document.location.hash = tab;
  }, [tab]);

  return (
    <main className='pt-6 bg-smoky-black'>
      <Header info={info} />
      <Sidebar info={info} />
      <div className='main-content'>
        <Navbar activeTab={tab} setActiveTab={setTab} />
        <About isActive={tab === "About"} info={info} />
        <Projects isActive={tab === "Projects"} />
      </div>
    </main>
  )
}

export default App
