import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Bank Transaction">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Bank Transactions">
        <div className="pt-2 w-full max-h-[60vh] overflow-auto scrollbar-hide">
            {transactions.map(t => <div className="flex justify-between gap-44 pt-1 border-b">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-400 text-[10px]">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}