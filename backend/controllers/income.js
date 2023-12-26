const IncomeSchema = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const income = new IncomeSchema({
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
        await income.save();
        res.status(200).json({ msg: "Income added successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
    console.log(income);
}

exports.getIncomes = async(req, res) => {
   try{
        const incomes= await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
   }catch(error){
        return res.status(500).json({ msg: error.message})
   }

}

exports.deleteIncome = async(req, res)=>{
    const {id}= req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income)=> res.json('Income deleted'))
        .catch((err)=> res.status(400).json('Error: '+ err))
}
