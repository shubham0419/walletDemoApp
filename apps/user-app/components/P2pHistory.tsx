import { Card } from "@repo/ui/card"
import { ArrowBigRight, Divide, IndianRupee } from "lucide-react"

type p2pProp = {
  p2pTransfers: {
    amount: number,
    fromUserId: number,
    toUserId: number,
    timestamp: Date,
    fromUser: {
      name: string | null
    },
    toUser: {
      name: string | null
    }
  }[];
  authUser: number
}

export const P2phistory = ({ p2pTransfers, authUser }: p2pProp) => {
  return (
    <Card title="P2P Transactions">
      <div className="pt-2 w-full max-h-[60vh] overflow-auto scrollbar-hide">
        {p2pTransfers.map(t => (
          <div key={t.timestamp.toISOString()} className="flex justify-between gap-44 pt-1 border-b">
            <div>
              {t.toUserId === authUser ? (
                <div className="text-sm flex flex-col">
                  <div className="text-sm">Received from {t.fromUser.name}</div>
                  <div className="text-[10px] text-gray-400">{t.timestamp.toDateString()}</div>
                </div>
              ) : (
                <div className="text-sm flex flex-col">
                  <div className="text-sm">Sent to {t.toUser.name}</div>
                  <div className="text-[10px] text-gray-400">{t.timestamp.toDateString()}</div>
                </div>
              )}
            </div>
            {t.toUserId === authUser ? (
              <div className="font-semibold flex text-green-500">+ <IndianRupee className="pt-1" size={18}/>{t.amount/100}</div>
            ) : (
              <div className="font-semibold flex text-red-500">- <IndianRupee className="pt-1" size={18}/>{t.amount/100}</div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
