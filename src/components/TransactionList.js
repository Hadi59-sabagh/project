import React, { useState } from 'react';

const TransactionList = ({ transactions = [], deleteTransaction }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearchTerm = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              transaction.amount.toString().includes(searchTerm);
    const matchesCategory = categoryFilter ? transaction.category === categoryFilter : true;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">لیست تراکنش‌ها</h3>

      <input
        type="text"
        placeholder="جستجو بر اساس عنوان یا مبلغ"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
      >
        <option value="">انتخاب دسته‌بندی</option>
        {["خوراک", "حمل و نقل", "قبوض", "تفریح"].map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>

      <ul className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition ease-in-out duration-200">
            <div>
              <span className="font-semibold text-lg text-gray-800">{transaction.title}</span>
              <span className="text-gray-500 text-sm"> - {transaction.category}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-800 font-semibold">{transaction.amount} تومان</span>
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
