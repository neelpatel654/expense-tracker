const xlsx = require("xlsx");
const Expense = require("../models/Expense");

//Add Expense Category
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    //validation check for fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    return res.status(200).json(newExpense);
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//Get All expense
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    return res.json(expense);
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

//Download expense Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    //prepare data for excel
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};
