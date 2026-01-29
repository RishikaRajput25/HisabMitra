import React from "react";
const FilterBar = ({
  filterType,
  setFilterType,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (


    // <div className="flex justify-between items-center my-4">
      
    
    //   <div className="flex items-center gap-2">
    //     <input
    //       type="text"
    //       placeholder="Search category..."
    //       value={selectedCategory}
    //       onChange={(e) => setSelectedCategory(e.target.value)}
    //       className="border px-3 py-2 rounded-lg"
    //     />

    //     {(selectedCategory || filterType !== "all") && (
    //       <button
    //         onClick={() => {
    //           setSelectedCategory("");
    //           setFilterType("all");
    //         }}
    //         className="text-sm text-blue-500"
    //       >
    //         ⬅ Reset
    //       </button>
    //     )}
    //   </div>

     

    //   <div className="flex gap-2">
    //     {["all", "paid", "received"].map(type => (
    //       <button
    //         key={type}
    //         onClick={() => setFilterType(type)}
    //         className={`px-3 py-1 rounded-lg ${
    //           filterType === type
    //             ? "bg-blue-500 text-white"
    //             : "bg-gray-200"
    //         }`}
    //       >
    //         {type.toUpperCase()}
    //       </button>
    //     ))}
    //   </div>
    // </div>




<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 my-6">
  
  {/* Search */}
  <div className="flex gap-2 w-full sm:w-auto">
    <input
      type="text"
      placeholder="Search category..."
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="border px-3 py-2 rounded-lg w-full sm:w-56"
    />

    {(selectedCategory || filterType !== "all") && (
      <button
        onClick={() => {
          setSelectedCategory("");
          setFilterType("all");
        }}
        className="text-sm text-blue-500 whitespace-nowrap"
      >
        Reset
      </button>
    )}
  </div>

  {/* Toggle */}
  <div className="flex gap-2 justify-center sm:justify-end">
    {["all", "paid", "received"].map(type => (
      <button
        key={type}
        onClick={() => setFilterType(type)}
        className={`px-4 py-1 rounded-lg text-sm ${
          filterType === type
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
      >
        {type.toUpperCase()}
      </button>
    ))}
  </div>
</div>

  );
};

export default FilterBar;
