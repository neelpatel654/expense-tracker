// import React, { useEffect, useState } from "react";
// import DashboardLayout from "../../component/layouts/DashboardLayout";
// import { useUserAuth } from "../../hooks/useUserAuth";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import InfoCard from "../../component/cards/InfoCard";
// import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
// import { IoMdCard } from "react-icons/io";
// import { addThousandsSeparator } from "../../utils/helper";
// import RecentTransactions from "../../component/dashboard/RecentTransactions";
// import FinanceOverview from "../../component/dashboard/FinanceOverview";
// import ExpenseTransactions from "../../component/dashboard/ExpenseTransactions";
// import Last30DaysExpenses from "../../component/dashboard/Last30DaysExpenses";
// import RecentIncomeWithChart from "../../component/dashboard/RecentIncomeWithChart";
// import RecentIncome from "../../component/dashboard/RecentIncome";

// const Home = () => {
//   useUserAuth();

//   const navigate = useNavigate();

//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchDashboardData = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const response = await axiosInstance.get(
//         `${API_PATHS.DASHBOARD.GET_DATA}`
//       );

//       if (response.data) {
//         setDashboardData(response.data);
//       }
//     } catch (e) {
//       console.log("Something went wrong. Please try again later.", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//     return () => {};
//   }, []);

//   return (
//     <DashboardLayout activeMenu="Dashboard">
//       <div className="my-5 mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <InfoCard
//             icon={<IoMdCard />}
//             lable="Total Balance"
//             value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
//             color="bg-primary"
//           />
//           <InfoCard
//             icon={<LuWalletMinimal />}
//             lable="Total Income"
//             value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
//             color="bg-orange-500"
//           />
//           <InfoCard
//             icon={<LuHandCoins />}
//             lable="Total Expense"
//             value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
//             color="bg-red-500"
//           />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//           <RecentTransactions
//             transactions={dashboardData?.recentTransactions}
//             onSeeMore={() => navigate("/expense")}
//           />

//           <FinanceOverview
//             totalBalance={dashboardData?.totalBalance || 0}
//             totalIncome={dashboardData?.totalIncome || 0}
//             totalExpense={dashboardData?.totalExpense || 0}
//           />

//           <ExpenseTransactions
//             transactions={dashboardData?.last30DaysExpense?.transaction || []}
//             onSeeMore={() => navigate("/expense")}
//           />

//           <Last30DaysExpenses
//             data={dashboardData?.last30DaysExpense?.transaction || []}
//           />

//           <RecentIncomeWithChart
//             data={
//               dashboardData?.last60DaysIncome?.transaction?.slice(0, 4) || []
//             }
//             totalIncome={dashboardData?.totalIncome || 0}
//           />

//           <RecentIncome
//             transactions={dashboardData?.last60DaysIncome?.transaction || []}
//             onSeeMore={() => navigate("/income")}
//           />
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  TrendingUp as TrendUp,
  TrendingDown as TrendDown,
  ArrowRight,
  Utensils,
  Car,
  Building,
  Home as HomeIcon,
  Sparkles,
} from "lucide-react";
import DashboardLayout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandsSeparator } from "../../utils/helper";
import { useUserAuth } from "../../hooks/useUserAuth";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (e) {
      console.log("Something went wrong. Please try again later.", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalBalance = addThousandsSeparator(dashboardData?.totalBalance || 0);
  const totalIncome = addThousandsSeparator(dashboardData?.totalIncome || 0);
  const totalExpense = addThousandsSeparator(dashboardData?.totalExpense || 0);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="p-8 space-y-8 animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Financial Dashboard
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back! Here's your financial overview
            </p>
          </div>
          <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg animate-float">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Total Balance */}
          <Card className="glass-card border-2 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Total Balance
              </CardTitle>
              <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                <Wallet className="h-7 w-7 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                ${totalBalance}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Available funds
              </p>
            </CardContent>
          </Card>

          {/* Total Income */}
          <Card className="glass-card border-2 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-income/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Total Income
              </CardTitle>
              <div className="h-14 w-14 rounded-2xl gradient-income flex items-center justify-center shadow-lg">
                <TrendUp className="h-7 w-7 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold bg-gradient-to-r from-income to-income-light bg-clip-text text-transparent">
                ${totalIncome}
              </div>
            </CardContent>
          </Card>

          {/* Total Expense */}
          <Card className="glass-card border-2 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-expense/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between pb-3 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Total Expense
              </CardTitle>
              <div className="h-14 w-14 rounded-2xl gradient-expense flex items-center justify-center shadow-lg">
                <TrendDown className="h-7 w-7 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-4xl font-bold bg-gradient-to-r from-expense to-expense-light bg-clip-text text-transparent">
                ${totalExpense}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Transactions */}
          <Card className="glass-card border-2 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
              <CardTitle className="text-2xl font-bold">
                Recent Activity
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/10"
                onClick={() => navigate("/expense")}
              >
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {dashboardData?.recentTransactions?.length ? (
                  dashboardData.recentTransactions.slice(0, 4).map((tx, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border/50 group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${
                            tx.type === "expense"
                              ? "gradient-expense"
                              : "gradient-income"
                          }`}
                        >
                          {tx.type === "expense" ? (
                            <Utensils className="h-6 w-6 text-white" />
                          ) : (
                            <Building className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-base">
                            {tx.category || "Transaction"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(tx.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`font-bold text-lg ${
                          tx.type === "expense"
                            ? "text-expense"
                            : "text-success"
                        }`}
                      >
                        {tx.type === "expense" ? "-" : "+"}${tx.amount}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">
                    No recent transactions
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Financial Overview Chart */}
          <Card className="glass-card border-2 hover:shadow-xl transition-shadow">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="text-2xl font-bold">
                Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col items-center justify-center">
              <div className="relative h-64 w-64">
                <svg
                  viewBox="0 0 100 100"
                  className="transform -rotate-90 drop-shadow-2xl"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gradient-primary)"
                    strokeWidth="14"
                    strokeDasharray="157 251"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gradient-income)"
                    strokeWidth="14"
                    strokeDasharray="94 314"
                    strokeDashoffset="-157"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gradient-expense)"
                    strokeWidth="14"
                    strokeDasharray="94 314"
                    strokeDashoffset="-251"
                  />
                  <defs>
                    <linearGradient
                      id="gradient-primary"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop
                        offset="100%"
                        stopColor="hsl(var(--primary-light))"
                      />
                    </linearGradient>
                    <linearGradient
                      id="gradient-income"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="hsl(var(--income))" />
                      <stop
                        offset="100%"
                        stopColor="hsl(var(--income-light))"
                      />
                    </linearGradient>
                    <linearGradient
                      id="gradient-expense"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="hsl(var(--expense))" />
                      <stop
                        offset="100%"
                        stopColor="hsl(var(--expense-light))"
                      />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-sm text-muted-foreground font-medium">
                    Balance
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                    ${totalBalance}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
