import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const FilterCard = () => {
  let filterData = [
    {
      filterType: "Location",
      array: [
        "Delhi NCR", "Banglore", "Hydrabad" , "Chandigarh" , "Mumbai" , "Haryana" , "Pune",
      ],
    },
    {
      filterType: "Industry",
      array: [
        "Frontend Developer", "Backend Developer", "Data Scrience" ," Full Stack Developer", "NextJs",
      ],
    },
    {
      filterType: "Salary",
      array: [
        "0-40k",  "42K- 1 Lakh" , "1 Lakh - 5 Lakh ",
      ],
    },
  ];
  return (
    
    <div className='w-full bg-white p-3 rounded-2xl  border-gray-300 shadow-lg '>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3'></hr>
      <RadioGroup>
        {
          filterData.map((data, index) => (
            <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, index) => {
                  return (
                    <div className='flex items-center space-x-2 my-2 '>
                      <RadioGroupItem value={item}/>
                      <Label >{ item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
      
    </div>
  )
}

export default FilterCard