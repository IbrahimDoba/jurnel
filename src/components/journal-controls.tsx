import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function JournalControls() {
  return (
   <div className="ml-[10%]  flex flex-col ">
   <div className="flex justify-center items-center">
     <FaAngleLeft size={30} className="mr-2 text-white bg-emerald-500 cursor-pointer" />
     <span className="text-lg p-2 text-white bg-emerald-500 rounded-full">
       WG
     </span>
     <FaAngleRight size={30} className="ml-2 text-white bg-emerald-500 cursor-pointer" />
   </div>
   <div className="flex justify-center items-center">
     <h2 className="text-2xl text-black mr-2">Jurnal</h2>
     <span className="text-emerald-500 text-2xl">#1</span>
   </div>
   <div className="flex justify-center items-center">
     <span className="text-xl text-emerald-500">
       Today | <span>5/6/2024</span>
     </span>
   </div>
 </div>
  )
}

export default JournalControls