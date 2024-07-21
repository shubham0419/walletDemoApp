import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2phistory } from "../../../components/P2pHistory";
import { p2pTransfer } from "../../lib/actions/p2pTransfer";

const getP2pHistory = async () => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
  
    if (!userId) {
      return [];
    }
  
    const history = await prisma.p2pTransfer.findMany({
      where: {
        OR: [
          { fromUserId: Number(userId) },
          { toUserId: Number(userId) }
        ]
      },
      include: {
        fromUser: {
          select: {
            name: true,
          },
        },
        toUser: {
          select: {
            name: true,
          },
        },
      },
    });
  
    return history
  };


async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function () { 
    const session = await getServerSession(authOptions);
    const transactions = await getOnRampTransactions();
    const p2pTransfers = await getP2pHistory()
    return <div>
        <div className="text-4xl text-[#6a51a6] pt-4 font-bold">
            Transactions
        </div>
        <div className="flex w-[70vw] justify-between">
            <div className="pt-4">
                <OnRampTransactions transactions={transactions} />
            </div>
            <div className="pt-4">
                <P2phistory p2pTransfers={p2pTransfers} authUser={session?.user?.id}/>
            </div>
        </div>
    </div>
}