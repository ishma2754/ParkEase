import React from 'react'

const InformationSection = ({data}) => {
  return (
   <div className='rounded flex flex-col items-center bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg mx-w-lg lg:w-1/2 mx-auto p-2'>
   <p className='text-gray-900 font-bold font-poppins'>IT PARK: {data.name}</p>
   <p className='text-gray-900 font-bold font-poppins'>Rs {data.price_per_hour}/hr</p>
   </div>
  )
}

export default InformationSection