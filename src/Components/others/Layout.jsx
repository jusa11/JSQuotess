import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../blocks/profile/other/Navbar';
import Sidebar from '../blocks/profile/other/Sidebar';
import PersonBlock from '../blocks/profile/other/PersonBlock';
import StatsProfile from '../blocks/profile/other/StatsProfile';
import Stepper from '../blocks/profile/other/Stepper';
import { selectStatsStatus } from '../redux/slices/statsBarSlice';
import { useOutletRef } from '../../Hooks/useOutletRef';

gsap.registerPlugin(ScrollTrigger);

const Layout = () => {
  const outletRef = useOutletRef();
  const statsBarStatus = useSelector(selectStatsStatus);

  useEffect(() => {
    if (outletRef.current && outletRef.current.length > 0) {
      outletRef.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power1.out',
          }
        );
      });
    }
  }, [outletRef]);

  return (
    <main className="profile">
      <div className="profile-container">
        <PersonBlock />
        <div className="profile-wrapper">
          <Sidebar />
          <section className="profile-content">
            <Outlet />
          </section>
          <section
            className={`profile-rigth ${statsBarStatus ? 'stats-active' : ''}`}
          >
            <StatsProfile />

            <Stepper />
          </section>
        </div>
      </div>

      <Navbar />
    </main>
  );
};

export default Layout;
