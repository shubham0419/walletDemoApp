import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";

type UserType = {
  id: number;
  email: string | null;
  name: string | null;
  number: string;
};

const getAllUsers = async () => {
  const session = await getServerSession(authOptions);
  const loggedInUserId = session?.user?.id || null;

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      number: true,
    },
  });
  console.log(loggedInUserId);
  return users.filter(user => user.id != loggedInUserId);
};

export default async function Page() {
  const allUsers = await getAllUsers();

  console.log();

  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfer
      </div>
      <SendCard allUsers={allUsers} />
    </div>
  );
}
