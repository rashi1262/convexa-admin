import React from 'react'
import { FileInput, Input } from '../../common/FormInputs'
import { useForm } from 'react-hook-form';

const AddCategory = () => {

    const { handleSubmit, control } = useForm();

    const onSubmit = async (data) => {
      try {
        const response = await fetch(' http://localhost:8080/addcategory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        console.log(result); 
      } catch (error) {
        console.error('Error:', error); 
      }
    };
    
  return (
    <div>
       <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add Tool</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <Input
              name="name"
              control={control}
              label="Name"
              placeholder="Enter category name"
            />

            
            
          
            
            <FileInput
              name="icon"
              control={control}
              label="Category Icon"
            />
           
          
          

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategory
