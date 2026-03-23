
 export const getMonthlyData=(expenses,selectedMonth)=>{

 const categoryTotals = {};
 let TotalExpense=0;
 let RecievedAmount=0;
  expenses.forEach((item) => {
    const date = new Date(item.date);
    const itemMonth = date.getMonth(); // 0-11

    if (item.type === "Paid" && itemMonth === selectedMonth) {
      categoryTotals[item.category] =
        (categoryTotals[item.category] || 0) + item.amount;
    }

   
    if(item.type === "Paid" && itemMonth === selectedMonth){
      TotalExpense += item.amount;
    }
   
   
if(item.type === "Received" && itemMonth === selectedMonth){
      RecievedAmount += item.amount;
    }
  });

  return Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
    TotalExpense: Number(TotalExpense),
    RecievedAmount: Number(RecievedAmount),
  }));


}