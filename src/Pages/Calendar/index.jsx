import EmotionCalendar from '../../Components/EmotionCalendar';
import { NavLink } from 'react-router-dom';
import Layout from '../../Components/Layout';
import { HiChevronDoubleLeft } from 'react-icons/hi';
import './Calendar.css';

const Calendar = () => {
  return (
    <Layout>
      <NavLink className="iconBack" to="/">
        <HiChevronDoubleLeft />
      </NavLink>
      <div className="Calendar">
        <EmotionCalendar />
      </div>
    </Layout>
  );
};

export default Calendar;
