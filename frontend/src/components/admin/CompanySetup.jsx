import React from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '@radix-ui/react-label'

const CompanySetup = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-xl mx-auto my-10">
        <form action="">
          <div className='flex items-center gap-5 p-8'> 
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold rounded-xl"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="text-2xl font-bold my-5">Company Setup</h1>
                  </div>
                  <Label>Company Name</Label>
                    <input
                        type="text"
                        className="border p-2 w-full rounded-lg"
                      placeholder="Company Name"
                    />
        </form>
      </div>
    </div>
  );
}

export default CompanySetup