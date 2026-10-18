import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import VisiMisi from '@/components/sections/VisiMisi';
import Division from '@/components/sections/Division';
import Projects from '@/components/sections/Projects';
import Events from '@/components/sections/Events';
import TechStack from '@/components/sections/TechStack';
import Members from '@/components/sections/Members';
import News from '@/components/sections/News';
import Gallery from '@/components/sections/Gallery';
import Leaderboard from '@/components/sections/Leaderboard';
import Feedback from '@/components/sections/Feedback';
import Registration from '@/components/sections/Registration';

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <About />
      <VisiMisi />
      <Division />
      <Projects />
      <Events />
      <TechStack />
      <Members />
      <News />
      <Gallery />
      <Leaderboard />
      <Feedback />
      <Registration />
    </div>
  );
}