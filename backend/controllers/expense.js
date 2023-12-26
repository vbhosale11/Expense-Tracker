const expenseSchema = require('../models/expenseModel');



exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const expense = new expenseSchema({
        title,
        amount,
        category,
        description,
        date
    });
    try {
        //validation
        if (!title || !amount || !category || !date) {
            return res.status(400).json({ msg: "Please fill all the fields" })
        }
        if (amount <= 0 && !amount === 'number') {
            return res.status(400).json({ msg: "Amount can not be negative" })
        }
        await expense.save();
        res.status(200).json({ msg: "Expense added successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
    console.log(expense);
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await expenseSchema.find().sort({ createdAt: -1 })
        res.status(200).json(expenses)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }

}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    expenseSchema.findByIdAndDelete(id)
        .then((expense) => res.json('Expense deleted'))
        .catch((err) => res.status(400).json('Error: ' + err))
}
