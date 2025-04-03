import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const useExpenseContext = () => {
  return useContext(ExpenseContext);
};

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    // بارگذاری تراکنش‌ها از localStorage
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [categories, setCategories] = useState(["خوراک", "حمل و نقل", "قبوض", "تفریح"]);

  const addTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const editTransaction = (id, updatedTransaction) => {
    const updatedTransactions = transactions.map(transaction =>
      transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
    );
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const addCategory = (newCategory) => {
    setCategories(prevCategories => [...prevCategories, newCategory]);
  };

  return (
    <ExpenseContext.Provider value={{ transactions, addTransaction, deleteTransaction, editTransaction, categories, addCategory }}>
      {children}
    </ExpenseContext.Provider>
  );
};
