const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req,res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        //Fetch total income and expense
        const totalIncome = await Income.aggregate([
            {$match: {userId:userObjectId}},
            {$group: {_id:null,total:{$sum: "$amount"}}},
        ]);
        
        const totalExpense = await Expense.aggregate([
            {$match: {userId:userObjectId}},
            {$group: {_id:null,total:{$sum: "$amount"}}},
        ]);

        //Get income transaction in last 60 days
        const last60DaysIncomeTransaction = await Income.find({
            userId,
            date: {$gte: new Date(Date.now() - 60*24*60*60*1000)},
        }).sort({date: -1});

        //Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransaction.reduce(
            (sum,transaction) => sum + transaction.amount,
            0
        );

         //Get expense transaction in last 60 days
        const last30DaysExpenseTransaction = await Expense.find({
            userId,
            date: {$gte: new Date(Date.now() - 30*24*60*60*1000)},
        }).sort({date: -1});

        //Get total income for last 60 days
        const expenseLast30Days = last30DaysExpenseTransaction.reduce(
            (sum,transaction) => sum + transaction.amount,
            0
        );

        // Fetch last 5 transaction (income + expense)
        const lastTransaction = [
            ...(await Income.find({userId}).sort({date:-1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type:"income",
                })
            ),
            ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type:"expense",
                })
            ),
        ].sort((a,b) => b.date-a.date);

        //Final Response
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpense: {
                total: expenseLast30Days,
                transaction: last30DaysExpenseTransaction,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transaction: last60DaysIncomeTransaction,
            },
            recentTransactions: lastTransaction,
        });
    }
    catch(error){
        res.status(500).json({message:"Server Error", error});
    }
}
