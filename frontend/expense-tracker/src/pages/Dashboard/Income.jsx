// import React, { useState, useEffect } from "react";
// import DashboardLayout from "../../component/layouts/DashboardLayout";
// import IncomeOverview from "../../component/income/IncomeOverview";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import Modal from "../../component/Modal";
// import AddIncomeForm from "../../component/income/AddIncomeForm";
// import toast from "react-hot-toast";
// import IncomeList from "../../component/income/IncomeList";
// import DeleteAlert from "../../component/DeleteAlert";
// import { useUserAuth } from "../../hooks/useUserAuth";

// const Income = () => {
//   useUserAuth();

//   const [incomeData, setIncomeData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [openDeleteAlert, setOpenDeleteAlert] = useState({
//     show: false,
//     data: null,
//   });
//   const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

//   //Get All Income Details
//   const fetchIncomeDetails = async () => {
//     if (loading) return;

//     setLoading(true);

//     try {
//       const response = await axiosInstance.get(
//         `${API_PATHS.INCOME.GET_ALL_INCOME}`
//       );

//       if (response.data) {
//         setIncomeData(response.data);
//       }
//     } catch (error) {
//       console.log("Something went wrong. Please try again.", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   //Handle Add Income
//   const handleAddIncome = async (income) => {
//     const { source, amount, date, icon } = income;

//     if (!source.trim()) {
//       toast.error("Source is required.");
//       return;
//     }

//     if (!amount || isNaN(amount) || Number(amount) <= 0) {
//       toast.error("Amount should be a valid number greater than 0.");
//     }

//     if (!date) {
//       toast.error("Date is required.");
//       return;
//     }

//     try {
//       await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
//         source,
//         amount,
//         date,
//         icon,
//       });

//       setOpenAddIncomeModal(false);
//       toast.success("Income added successfully.");
//       fetchIncomeDetails();
//     } catch (error) {
//       console.error(
//         "Error adding income:",
//         error.response?.data?.message || error.message
//       );
//     }
//   };

//   //Delete Income
//   const deleteIncome = async (id) => {
//     try {
//       await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

//       setOpenDeleteAlert({ show: false, data: null });
//       toast.success("Income details deleted successfully");
//       fetchIncomeDetails();
//     } catch (error) {
//       console.error(
//         "Error deleting income:",
//         error.response?.data?.message || error.message
//       );
//     }
//   };

//   //Handle Download Income Details
//   const handleDownloadIncomeDetails = async () => {};

//   useEffect(() => {
//     fetchIncomeDetails();

//     return () => {};
//   }, []);
//   return (
//     <DashboardLayout activeMenu="Income">
//       <div className="my-5 mx-auto">
//         <div className="grid grid-cols-1 gap-6">
//           <div className="">
//             <IncomeOverview
//               transactions={incomeData}
//               onAddIncome={() => setOpenAddIncomeModal(true)}
//             />
//           </div>

//           <IncomeList
//             transactions={incomeData}
//             onDelete={(id) => {
//               setOpenDeleteAlert({ show: true, data: id });
//             }}
//             onDownload={handleDownloadIncomeDetails}
//           />
//         </div>
//         <Modal
//           isOpen={openAddIncomeModal}
//           onClose={() => setOpenAddIncomeModal(false)}
//           title="Add Income"
//         >
//           <AddIncomeForm onAddIncome={handleAddIncome} />
//         </Modal>

//         <Modal
//           isOpen={openDeleteAlert.show}
//           onClose={() => setOpenDeleteAlert({ show: false, data: null })}
//           title="Delete Income"
//         >
//           <DeleteAlert
//             content="Are you sure you want to delete this income details?"
//             onDelete={() => deleteIncome(openDeleteAlert.data)}
//           />
//         </Modal>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Income;

import { useState, useEffect, createElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Download,
  Building,
  Home,
  Trash2,
  TrendingUp,
  Wallet,
  Briefcase,
  PiggyBank,
  DollarSign,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";
// import DashboardLayout from "../../component/layouts/DashboardLayout";
import DashboardLayout from "../../components/Layout";

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(DollarSign);

  const incomeIcons = [
    { icon: DollarSign, name: "Money" },
    { icon: Briefcase, name: "Business" },
    { icon: Wallet, name: "Wallet" },
    { icon: Building, name: "Building" },
    { icon: Home, name: "Property" },
    { icon: PiggyBank, name: "Savings" },
  ];

  const SelectedIconComponent = selectedIcon;

  // ✅ Fetch all income
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data) setIncomeData(response.data);
    } catch (error) {
      console.error("Failed to fetch income:", error);
      toast.error("Failed to fetch income details.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new income
  const handleAddIncome = async () => {
    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon: selectedIcon.name || "DollarSign",
      });
      toast.success("Income added successfully.");
      setOpen(false);
      setSource("");
      setAmount("");
      setDate("");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income.");
    }
  };

  // ✅ Delete income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      toast.success("Income deleted successfully.");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income.");
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="p-8 space-y-8 animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-income to-income-light bg-clip-text text-transparent">
              Income Overview
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your earnings and income trends
            </p>
          </div>

          {/* Add Income Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-12 px-6 text-base font-semibold gradient-income border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Plus className="mr-2 h-5 w-5" /> Add Income
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-2">
              <div className="gradient-income p-6 pb-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white">
                    Add New Income
                  </DialogTitle>
                  <p className="text-white/80 text-sm mt-1">
                    Track your earnings and income sources
                  </p>
                </DialogHeader>
              </div>

              <div className="p-6 pt-0 space-y-5">
                {/* Icon Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">
                    Income Icon
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-16 justify-start text-left border-2 hover:border-income/50 transition-colors"
                      >
                        <div className="h-10 w-10 rounded-xl gradient-income flex items-center justify-center mr-3 shadow-md">
                          <SelectedIconComponent className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-muted-foreground">
                          Pick an icon
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-3" align="start">
                      <div className="grid grid-cols-3 gap-2">
                        {incomeIcons.map((item, i) => (
                          <Button
                            key={i}
                            variant="ghost"
                            className="h-20 flex-col gap-2 hover:bg-income/10 border-2 border-transparent hover:border-income/30"
                            onClick={() => setSelectedIcon(item.icon)}
                          >
                            <div className="h-10 w-10 rounded-lg gradient-income flex items-center justify-center shadow-sm">
                              <item.icon className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xs font-medium">
                              {item.name}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Source */}
                <div className="space-y-2">
                  <Label htmlFor="source">Income Source</Label>
                  <Input
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="Freelance, Salary, Business, etc."
                    className="h-12 border-2 focus:border-income transition-colors"
                  />
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="h-12 pl-10 border-2 focus:border-income transition-colors"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="h-12 pl-10 border-2 focus:border-income transition-colors"
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  className="w-full h-12 text-base font-semibold gradient-income border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mt-6"
                  onClick={handleAddIncome}
                >
                  Add Income
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Income Sources List */}
        <Card className="glass-card border-2 hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
            <CardTitle className="text-2xl font-bold">Income Sources</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:bg-primary/10"
              onClick={() => toast.success("Download feature coming soon!")}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {incomeData.map((income) => (
                <div
                  key={income._id}
                  className="p-6 rounded-2xl border-2 border-border/50 hover:border-income/30 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl gradient-income flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                        {createElement(DollarSign, {
                          className: "h-8 w-8 text-white",
                        })}
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1">
                          {income.source}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(income.date).toDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                      onClick={() => deleteIncome(income._id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-success flex items-center gap-2">
                        +${income.amount}
                        <TrendingUp className="h-6 w-6" />
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Income recorded on{" "}
                      {new Date(income.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Income;
