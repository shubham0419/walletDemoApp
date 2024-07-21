"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

type allUsersType = {
  allUsers: {
    id: number,
    email: string | null,
    name: string | null,
    number: string,
  }[]
}

export function SendCard({ allUsers }: allUsersType) {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return <div className="">
    <Center>
      <Card title="Send">
        <div className="min-w-72 pt-2">
          <div>
            <label htmlFor="user-select">Number</label>
            <select id="user-select" onChange={(e) => setNumber(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="">Select a user</option>
              {allUsers.map(user => (
                <option key={user.id} value={user.number}>
                  {user.name ? `${user.name} (${user.number})` : user.number}
                </option>
              ))}
            </select>
          </div>
          <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
            setAmount(value)
          }} />
          <div className="pt-4 flex justify-center">
            <Button onClick={async () => {
              await p2pTransfer(number, Number(amount) * 100)
            }}>Send</Button>
          </div>
        </div>
      </Card>
    </Center>
  </div>
}
