import { NavLink } from 'react-router-dom';
import { HiChevronDoubleLeft } from 'react-icons/hi';
import Layout from '../../Components/Layout';
import CalendarMonthlyChart from '../../Components/CalendarMonthlyChart';
import MonthlyChart from '../../Components/MonthlyChart';
import './Trends.css';

const Trends = () => {
  return (
    <Layout>
      <NavLink className="iconBack-trends" to="/">
        <HiChevronDoubleLeft />
      </NavLink>
      <div className="Trends">
        <CalendarMonthlyChart />
        <MonthlyChart />
      </div>
    </Layout>
  );
};

export default Trends;
