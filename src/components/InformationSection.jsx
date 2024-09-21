import React from 'react'

const InformationSection = ({data}) => {
  return (
   <div className='rounded flex flex-col items-center bg-yellow-500 mx-w-lg lg:w-1/2 mx-auto p-2'>
   <p className='text-gray-900 font-bold'>IT PARK: {data.name}</p>
   <p className='text-gray-900 font-bold'>${data.price_per_hour}/hr</p>
   </div>
  )
}

export default InformationSection