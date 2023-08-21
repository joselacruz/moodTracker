import React, { useContext, useEffect, useState } from "react";
import { MoodContext } from "../../Context";
import { formatDate } from "../../Utils/dateUtils";
import moment from "moment";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./MonthlyChart.css";

const MonthlyChart = () => {
  // Obtener el contexto de las emociones
  const context = useContext(MoodContext);

  // Estado local para almacenar los datos filtrados y necesarios
  const [dataForChart, setDataForChart] = useState([]);

  // Función para parsear la fecha y obtener el mes y año
  const targetDate = (date) => {
    const { formatedData } = formatDate(date);
    const [year, month] = formatedData.split("-");
    return `${year}-${month}`;
  };

  // Obtener la fecha recibida desde el Calendario
  const dateRecibeToCalendar = targetDate(context.monthToFilterChart);

  // Filtrar los ítems cuyos meses y años sean iguales al seleccionado
  const filterByDate = context.savedMood?.filter(
    (item) => targetDate(item.date.formatedData) === dateRecibeToCalendar
  );

  // Actualizar el estado local dataForChart con los datos filtrados cuando cambie dateRecibeToCalendar
  useEffect(() => {
    setDataForChart(
      filterByDate?.map((item) => ({
        date: item.date.formatedData,
        emotion: item.value,
        color: item.icon.props.color,
      })) || []
    );
  }, [dateRecibeToCalendar]);

  // Agrupar los datos por mes y emoción
  const groupedData = dataForChart.reduce((acc, entry) => {
    const month = moment(entry.date).format("YYYY-MM");
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(entry);
    return acc;
  }, {});

  // Obtener todas las emociones únicas
  const allEmotions = [...new Set(dataForChart.map((entry) => entry.emotion))];

  // Crear los datos para el gráfico mensual
  const monthlyChartData = Object.entries(groupedData).map(([month, data]) => ({
    month,
    ...data.reduce((acc, entry) => {
      if (!acc[entry.emotion]) {
        acc[entry.emotion] = 0;
      }
      acc[entry.emotion]++;
      return acc;
    }, {}),
  }));
   //Texto a Mostrar en el Titulo
   const renderTitle = () => {
    if (dataForChart.length > 0) {
      return <h3>Emotional Trends by Month</h3>;
    } else {
      return <h3>No Results found for This Date</h3>; 
    }
  };
  
  return (
    <div className="MonthlyChart">
        {renderTitle()}
      <BarChart
        width={600}
        height={300}
        data={monthlyChartData}
        className={`chart-container ${
          dataForChart.length === 0 ? "inactive" : ""
        }`}
      >
        <CartesianGrid strokeDasharray="6 6" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {allEmotions.map((emotion, index) => (
          <Bar
            key={emotion}
            dataKey={emotion}
            stackId="a"
            fill={
              dataForChart.find((item) => item.emotion === emotion)?.color ||
              "#888888"
            }
          />
        ))}
      </BarChart>
    </div>
  );
};

export default MonthlyChart;
