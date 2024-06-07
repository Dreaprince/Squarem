"use client"
import InputForm from "@/components/InputForm";
import LinkTable from "@/components/LinkTable";
import Navbar from "@/components/Navbar";




const Page = async () => {

  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto ml-[50px] mb-10">
        <p className="pl-6 font-semibold  mt-10 ">Shorten URL</p>
        <InputForm />
        <div className="pt-8 space-y-5">
          <LinkTable />
        </div>
      </main>
    </div>
  )
}

export default Page