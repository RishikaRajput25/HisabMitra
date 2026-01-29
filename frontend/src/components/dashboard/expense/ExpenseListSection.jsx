const ExpenseListSection = ({ expenses }) => {
  return (
    <>
      <p className="text-gray-700 text-center mt-4">
        This is your Expense List
      </p>

      <ListingCards expenses={expenses} />
    </>
  );
};

export default ExpenseListSection;
