import React, { useState, useEffect } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChartData from "../charts/CustomBarChartData";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(null);

    return () => {};
  }, [data]);
  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expense</h5>
      </div>

      <CustomBarChartData data={data} />
    </div>
  );
};

export default Last30DaysExpenses;
