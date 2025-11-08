// import React, { useEffect, useState } from "react";
// import { useUserAuth } from "../../hooks/useUserAuth";
// import DashboardLayout from "../../components/Layout";
// import ExpenseOverview from "../../component/expense/ExpenseOverview";
// import ExpenseList from "../../component/expense/ExpenseList";
// import AddExpenseForm from "../../component/expense/AddExpenseForm";
// import Modal from "../../component/Modal";
// import DeleteAlert from "../../component/DeleteAlert";
// import { API_PATHS } from "../../utils/apiPaths";
// import axiosInstance from "../../utils/axiosInstance";
// import toast from "react-hot-toast";

// const Expense = () => {
//   useUserAuth();

//   const [expenseData, setExpenseData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [openDeleteAlert, setOpenDeleteAlert] = useState({
//     show: false,
//     data: null,
//   });
//   const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

//   //Get All Expense Details
//   const fetchExpenseDetails = async () => {
//     if (loading) return;

//     setLoading(true);

//     try {
//       const response = await axiosInstance.get(
//         `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
//       );

//       if (response.data) {
//         setExpenseData(response.data);
//       }
//     } catch (error) {
//       console.log("Something went wrong. Please try again.", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   //Handle Add Expense
//   const handleAddExpense = async (expense) => {
//     const { category, amount, date, icon } = expense;

//     if (!category.trim()) {
//       toast.error("Category is required.");
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
//       await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
//         category,
//         amount,
//         date,
//         icon,
//       });

//       setOpenAddExpenseModal(false);
//       toast.success("Expense added successfully.");
//       fetchExpenseDetails();
//     } catch (error) {
//       console.error(
//         "Error adding expense:",
//         error.response?.data?.message || error.message
//       );
//     }
//   };

//   //Delete Expense
//   const deleteExpense = async (id) => {
//     try {
//       await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

//       setOpenDeleteAlert({ show: false, data: null });
//       toast.success("Expense details deleted successfully");
//       fetchExpenseDetails();
//     } catch (error) {
//       console.error(
//         "Error deleting expense:",
//         error.response?.data?.message || error.message
//       );
//     }
//   };

//   //Handle Download Expense Details
//   const handleDownloadExpenseDetails = async () => {};

//   useEffect(() => {
//     fetchExpenseDetails();

//     return () => {};
//   }, []);

//   return (
//     <DashboardLayout activeMenu="Expense">
//       <div className="my-5 mx-auto">
//         <div className="grid grid-cols-1 gap-6">
//           <div className="">
//             <ExpenseOverview
//               transactions={expenseData}
//               onAddExpense={() => setOpenAddExpenseModal(true)}
//             />
//           </div>

//           <ExpenseList
//             transactions={expenseData}
//             onDelete={(id) => {
//               setOpenDeleteAlert({ show: true, data: id });
//             }}
//             onDownload={handleDownloadExpenseDetails}
//           />
//         </div>
//         <Modal
//           isOpen={openAddExpenseModal}
//           onClose={() => setOpenAddExpenseModal(false)}
//           title="Add Expense"
//         >
//           <AddExpenseForm onAddExpense={handleAddExpense} />
//         </Modal>

//         <Modal
//           isOpen={openDeleteAlert.show}
//           onClose={() => setOpenDeleteAlert({ show: false, data: null })}
//           title="Delete Expense"
//         >
//           <DeleteAlert
//             content="Are you sure you want to delete this expense details?"
//             onDelete={() => deleteExpense(openDeleteAlert.data)}
//           />
//         </Modal>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Expense;

import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/Layout";
import {
  Plus,
  Download,
  Utensils,
  Car,
  ShoppingBag,
  Home,
  Plane,
  Coffee,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // form fields
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(ShoppingBag);

  const expenseIcons = [
    { icon: ShoppingBag, name: "Shopping" },
    { icon: Utensils, name: "Food" },
    { icon: Car, name: "Transport" },
    { icon: Home, name: "Housing" },
    { icon: Plane, name: "Travel" },
    { icon: Coffee, name: "Coffee" },
  ];
  const SelectedIconComponent = selectedIcon;

  // fetch all expenses
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (res.data) setExpenseData(res.data);
    } catch (err) {
      console.error("Error fetching expenses", err);
      toast.error("Failed to fetch expense data");
    } finally {
      setLoading(false);
    }
  };

  // add new expense
  const handleAddExpense = async () => {
    if (!category.trim()) return toast.error("Category is required");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Enter a valid amount");
    if (!date) return toast.error("Date is required");

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon: selectedIcon.name,
      });
      toast.success("Expense added successfully!");
      setOpen(false);
      setCategory("");
      setAmount("");
      setDate("");
      fetchExpenseDetails();
    } catch (err) {
      console.error("Error adding expense", err);
      toast.error("Failed to add expense");
    }
  };

  // delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (err) {
      console.error("Error deleting expense", err);
      toast.error("Failed to delete expense");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="p-8 space-y-8 animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-expense to-expense-light bg-clip-text text-transparent">
              Expense Tracker
            </h1>
            <p className="text-muted-foreground text-lg">
              Monitor and manage your spending habits
            </p>
          </div>

          {/* Add Expense Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-12 px-6 text-base font-semibold gradient-expense border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Plus className="mr-2 h-5 w-5" />
                Add Expense
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-2">
              <div className="gradient-expense p-6 pb-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white">
                    Add New Expense
                  </DialogTitle>
                  <p className="text-white/80 text-sm mt-1">
                    Track your spending and manage expenses
                  </p>
                </DialogHeader>
              </div>

              <div className="p-6 pt-0 space-y-5">
                {/* Icon Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-foreground">
                    Expense Icon
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-16 justify-start text-left border-2 hover:border-expense/50 transition-colors"
                      >
                        <div className="h-10 w-10 rounded-xl gradient-expense flex items-center justify-center mr-3 shadow-md">
                          <SelectedIconComponent className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-muted-foreground">
                          Pick an icon
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-3" align="start">
                      <div className="grid grid-cols-3 gap-2">
                        {expenseIcons.map((item, i) => (
                          <Button
                            key={i}
                            variant="ghost"
                            className="h-20 flex-col gap-2 hover:bg-expense/10 border-2 border-transparent hover:border-expense/30"
                            onClick={() => setSelectedIcon(item.icon)}
                          >
                            <div className="h-10 w-10 rounded-lg gradient-expense flex items-center justify-center shadow-sm">
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

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Expense Category</Label>
                  <Input
                    id="category"
                    placeholder="Food, Travel, etc."
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-12 border-2 focus:border-expense"
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
                      className="h-12 pl-10 border-2 focus:border-expense"
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
                      className="h-12 pl-10 border-2 focus:border-expense"
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  onClick={handleAddExpense}
                  className="w-full h-12 text-base font-semibold gradient-expense border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mt-6"
                >
                  Add Expense
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Expense Chart Section */}
        <Card className="glass-card border-2 hover:shadow-xl transition-shadow">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="text-2xl font-bold">
              Recent Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {expenseData.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No expenses found
                </p>
              ) : (
                expenseData.map((expense, i) => {
                  const Icon =
                    expenseIcons.find((icon) => icon.name === expense.icon)
                      ?.icon || ShoppingBag;
                  return (
                    <div
                      key={i}
                      className="p-4 rounded-xl border-2 border-border/50 hover:border-expense/30 hover:shadow-lg transition-all duration-200 group cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl gradient-expense flex items-center justify-center shadow-md">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-base">
                            {expense.category}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-xl text-expense">
                          -${expense.amount}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteExpense(expense._id)}
                        >
                          🗑️
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
