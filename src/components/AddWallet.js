import React, { useState } from 'react';
import { useExpenseContext } from "../context/ExpenseContext";

const AddWallet = () => {
  const { addWallet, wallets } = useExpenseContext();
  const [walletName, setWalletName] = useState("");
  const [error, setError] = useState("");

  const handleAddWallet = () => {
    if (!walletName.trim()) {
      setError("لطفاً نام کیف پول را وارد کنید.");
      return;
    }

    const isDuplicate = wallets.some(wallet => wallet.name === walletName);
    if (isDuplicate) {
      setError("کیف پول با این نام قبلاً اضافه شده است.");
      return;
    }

    addWallet({ id: Date.now(), name: walletName, balance: 0 });
    setWalletName("");
    setError("");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4">
      {error && <div className="text-red-500 font-semibold text-center">{error}</div>}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="نام کیف پول"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button
          type="button"
          onClick={handleAddWallet}
          className="w-full p-3 bg-green-600 text-white font-bold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
        >
          افزودن کیف پول
        </button>
      </div>
    </div>
  );
};

export default AddWallet;
