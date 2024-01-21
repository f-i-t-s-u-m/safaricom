// import React from 'react'

export default function LoaderUi() {
    return (
      <div className="relative mt-10 p-10">

      <div className="  flex gap-6 animate-pulse ">
       
     { Array(4).fill(0).map((el, index) => (
          <div key={index} className="flex flex-col gap-5 border w-1/3 shadow-sm p-5 rounded-sm">

            <div className="h-5 bg-gray-300 animate-pulse w-full rounded ">  </div>
            <div className="w-full flex felx-col justify-between">  
            <div className=" w-1/3  bg-gray-300 animate-pulse h-3 rounded-md">  </div>
            <div className=" w-1/3  bg-gray-300 animate-pulse h-3 rounded-md">  </div>
            </div>
          </div>
        ))}

        </div>

      <div className="mt-20 gap-5 flex flex-row ">
        <div className="h-56 w-3/5 bg-gray-100  animate-pulse border shadow-md rounded-md">

        </div>

        <div className="h-56 w-2/5 bg-gray-100 animate-pulse border shadow-md rounded-md">

        </div>
      </div>

      </div>
       
    )
  }
