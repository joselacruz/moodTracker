import { MoodContext } from '../../Context';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useContext } from 'react';

const CalendarMonthlyChart = () => {
  const context = useContext(MoodContext);
  //fecha Actual
  const currentDate = dayjs();

  //Tercer mes apartir de la Fecha Actual
  const thirdMonthAgo = currentDate.subtract(6, 'month').format('YYYY-MM-DD');

  const handleDateChange = (newValue) => {
    context.setMonthToFilterChart(newValue);

    console.log('Selected month:', newValue.format('MMMM YYYY')); // Mostrar el valor del mes y año
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['DateCalendar', 'DateCalendar', 'DateCalendar']}
      >
        <DateCalendar
          maxDate={currentDate}
          minDate={dayjs(thirdMonthAgo)}
          views={['month', 'year']}
          openTo="month"
          value={dayjs(context.monthToFilterChart)}
          onMonthChange={(view) => handleDateChange(view)}
          monthsPerRow={4}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
export default CalendarMonthlyChart;
