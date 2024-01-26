'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { login } from "../_actions/auth-action";
import { SubmitButton } from "@/components/submit-button";
import {useFormState} from "react-dom"
import { useEffect } from "react";
import Image from "next/image";
import bg_svg from "@/components/bg.svg"

export default function Login() {

  const [state, formAction] = useFormState(login, {})

  useEffect(() => {
    
    if(state.status == 201) {
      console.log("authenticated");
    }

  
  }, [state])
  
  return (
  
      <div className="flex flex-col mx-auto pt-20 items-center justify-center w-full  overflow-hidden bg-[url('/report.svg')] h-[90vh] bg-no-repeat bg-center   "  >

        {/* <Image src="./bg.svg" objectFit  fill alt="bg" className=" relative animate-spin overflow-hidden" /> */}

        <div className="w-full max-w-md space-y-8  shadow-md  border p-10 relative rounded-md bg-gray-50">
          <div >
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="mt-2 text-gray-600">
              Please sign in to your account.
            </p>
            { state.status && state?.status != "201" &&
              <div className="p-2 bg-red-500 rounded-md text-gray-200 mt-3">
              <p className=" text-lg font-bold ">
                Incorrect Password
            </p>

            <p className="">
                the password you entered is incorrect
            </p>
              </div>
               
            }
          </div>
          <form className="mt-8 space-y-6 " action={formAction}>
            <div>
              <label htmlFor="account" className="block font-bold text-gray-700 mb-2">
                Account
              </label>
              <Select name="account" >
                
                  <SelectTrigger>
                    <SelectValue placeholder="Select Account" />
                  </SelectTrigger>
               
                <SelectContent>
                  <SelectItem value="guest">Guest </SelectItem>
                  <SelectItem value="area_manager">Area Manager</SelectItem>
                  <SelectItem value="shop_manager">Shop Manager</SelectItem>
                  <SelectItem value="sales_team">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-bold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                defaultValue="am29630"
                placeholder="Enter your password"
                className="w-full px-4 border py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
             <SubmitButton className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700" label="Sign In" />
            </div>
          </form>
        </div>
      </div>

  );
}