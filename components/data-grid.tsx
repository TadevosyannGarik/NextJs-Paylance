"use client";

import { useSearchParams } from "next/navigation";
import { formatDateRange } from "@/lib/utils";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import {FaPiggyBank} from "react-icons/fa";
import { DataCard, DataCarDLoading } from "@/components/data-card";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";


export const DataGrid = () => {
    const { data, isLoading } = useGetSummary();

    const params = useSearchParams();
    const to = params.get("to") || undefined;
    const from = params.get("from") || undefined;

    const dateRangeLabel = formatDateRange({ to, from });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
                <DataCarDLoading />
                <DataCarDLoading />
                <DataCarDLoading />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
           <DataCard 
                title="Remaining"
                value={data?.ramainingAmount}
                percentageChange={data?.ramainingChange}
                icon={FaPiggyBank}
                dateRange={dateRangeLabel}
           />
           <DataCard 
                title="Income"
                value={data?.incomeAmount}
                percentageChange={data?.incomeChange}
                icon={FaArrowTrendUp}
                dateRange={dateRangeLabel}
           />
           <DataCard 
                title="Expenses"
                value={data?.expensesAmount}
                percentageChange={data?.expensesChange}
                icon={FaPiggyBank}
                dateRange={dateRangeLabel}
           />
        </div>
    )
}