'use client'
import { Field, FieldLabel } from "@src/components/ui/field";
import { Input } from "@src/components/ui/input";
import { useSession } from "next-auth/react";
import { FaAddressCard } from "react-icons/fa";

export default function Page() {
  const {data}=useSession()
  
  return <>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-100  flex items-center justify-center rounded-xl shrink-0 shadow-2xl w-12 h-12"><FaAddressCard className="text-blue-400 size-6"/></div>
            <div className="flex flex-col">
              <h2 className="font-bold">Personal Information</h2>
              <h2 className="text-gray-300">Basic info, like your name and email</h2>
            </div>
          </div>

    <Field >
      <FieldLabel htmlFor="input-field-username" className="text-gray-400">FULL NAME</FieldLabel>
      <Input
        id="input-field-username"
        type="text" className="font-bold"
        placeholder="Enter your username" value={data?.user.name}
      />
      <FieldLabel  className="text-gray-400 mt-2" htmlFor="input-field-username">EMAIL ADDRESS</FieldLabel>
      <Input
        id="input-field-username"
        type="text" className="font-bold"
        placeholder="Enter your username" value={data?.user.email}
      />
      <FieldLabel htmlFor="input-field-username" className="text-gray-400 mt-2">ROLE</FieldLabel>
      <Input
        id="input-field-username"
        type="text" className="font-bold"
        placeholder="Enter your username" value={data?.user.role}
      />
    </Field>


  </>
}