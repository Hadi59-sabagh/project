import React from 'react';
import { useExpenseContext } from "../context/ExpenseContext";

const ManageTransactions = () => {
  const { transactions, deleteTransaction, editTransaction } = useExpenseContext();

  const handleEdit = (id) => {
    const updatedTransaction = {
      // برای ویرایش تراکنش، مثلاً تغییر مبلغ یا تاریخ
    };
    editTransaction(id, updatedTransaction);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">مدیریت تراکنش‌ها</h3>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">هیچ تراکنشی ثبت نشده است.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center p-2">
              <span>{transaction.title} - {transaction.amount} تومان</span>
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="text-red-500 hover:text-red-700"
              >
                حذف
              </button>
              <button
                onClick={() => handleEdit(transaction.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                ویرایش
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageTransactions;
