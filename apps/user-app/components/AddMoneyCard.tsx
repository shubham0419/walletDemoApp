"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

type addMoneyProp = {
    user: number
}

export const AddMoney = ({ user }: addMoneyProp) => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0)
    return <Card title="Add Money">
        <div className="w-full pt-1">
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
                setValue(Number(val))
            }} />
            <div className="py-4 text-left">
                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
            }} options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))} />
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    const res = await createOnRampTransaction(provider, value)
                    // window.location.href = redirectUrl || "";
                    // if (res.message == "Done") {
                    //     try {
                    //         let ans = await axios.post("http://localhost:3003/hdfcWebhook", {
                    //             token: res.token,
                    //             user_identifier: user,
                    //             amount: value.toString()
                    //         })
                    //         console.log(ans);
                    //     } catch (error) {
                    //         console.log(error);
                    //     }

                    // }

                }}>
                    Add Money
                </Button>
            </div>
        </div>
    </Card>
}
