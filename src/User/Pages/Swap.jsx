import { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import axios from "axios";
// import { FaDollarSign } from 'react-icons/fa';
import { SiExpensify, SiTether } from 'react-icons/si';
import favlogo from "../../assets/userImages/Logo/icon2.png"
import Wallets from './Wallets';
import { appConfig } from "../../config/appConfig";

const Swap = () => {

    const swapFeePercent = 2;
    const [form, setForm] = useState({
        usdt: '',
        urwa: '',
    });

    const queryClient = useQueryClient();

    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    const mutation = useMutation({
      mutationFn: async ({ amount }) => {
        return axios.post(`${appConfig.baseURL}/user/swap/deposit-to-token`, { amount }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      },
      onSuccess: (res) => {
        toast.success(`Successfully swapped ${form.usdt} USDT for ${form.urwa} URWA`);
        queryClient.invalidateQueries(["usdtBalance"]);
        setForm({ usdt: '', urwa: '' });
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to swap");
      },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'usdt') {
            const fee = (value * swapFeePercent) / 100;
            const urwa = value ? (value - fee).toFixed(2) : '';
            setForm({
                usdt: value,
                urwa,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const usdt = parseFloat(form.usdt);
        const urwa = parseFloat(form.urwa);

        if (!usdt || usdt <= 0) {
            toast.error('Enter a valid USDT amount.');
            return;
        }

        mutation.mutate({ amount: usdt });
    };



    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <Wallets />
            </div>

            <div className="max-w-xl mx-auto border-gradient border p-6 rounded-xl text-dark shadow-lg space-y-6">
                <h2 className="text-2xl text-[#000000] font-bold text-center">Swap (USDT → URWA)</h2>

                
                {/* <div className="text-sm text-gray-600 text-center">
                    Your USDT Balance: <span className="text-dark text-lg font-semibold">${usdtBalance.toFixed(2)}</span>
                </div> */}

                 
                <form onSubmit={handleSubmit} className="space-y-4">
                   
                    <div className="relative">
                        <label className="block text-slate-800 font-medium text-sm mb-1">USDT Amount</label>
                        <div className="flex items-center bg-transparent border border-white/10 rounded-md gap-3 px-3 py-1 ">
                            <div className={`   aspect-[1/1]  glow-text bg-gradient-to-br from-blue-700 to-secondary rounded-full flex items-center justify-center`}>

                                <SiTether className=" m-2     " />
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                name="usdt"
                                value={form.usdt}
                                onChange={handleChange}
                                placeholder="Enter USDT"
                                className="w-full py-2 bg-transparent text-[#000000] focus:outline-none"
                            />
                        </div>
                    </div>

                    
                    <div className="relative">
                        <label className="block text-slate-800 font-medium text-sm mb-1">You’ll Receive (URWA)</label>
                        <div className="flex items-center bg-transparent border border-white/10 rounded-md gap-3 py-1 px-3">
                            <div className={`   aspect-[1/1]  glow-text bg-gradient-to-br from-blue-700 to-secondary rounded-full flex items-center justify-center`}>

                                <img src={favlogo} className='w-9' alt="favlogo" />
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                name="urwa"
                                value={form.urwa}
                                disabled
                                placeholder="URWA Amount"
                                className="w-full py-2 bg-transparent text-[#000000] focus:outline-none"
                            />
                        </div>
                    </div>

                     
                    {form.usdt && (
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>Swap Fee ({swapFeePercent}%)</span>
                            <span className="text-dark">
                                ${((form.usdt * swapFeePercent) / 100).toFixed(2)}
                            </span>
                        </div>
                    )}

                    
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full py-2 rounded-md font-semibold text-dark bg-gradient-to-r from-[#2460F5] to-[#3B1DDA] hover:opacity-90 transition disabled:opacity-50"
                    >
                        {mutation.isPending ? "Processing..." : "Swap Now"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Swap;