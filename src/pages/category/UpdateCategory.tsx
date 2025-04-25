import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, FileInput, Select, MultiSelect } from '../../common/FormInputs'; 
import { useParams } from 'react-router-dom';

const UpdateCategory = () => {
  const { id } = useParams(); 
  const { handleSubmit, control, reset } = useForm();

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const response = await fetch(`  http://localhost:8080/getCategoryById/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const toolData = await response.json();
        reset(toolData); 
      } catch (error) {
        console.error('Error fetching tool:', error);
      }
    };

    fetchTool();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8080/updateCategory/${id}`, {
        method: 'PUT',
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
      console.error('Error updating tool:', error); 
    }
  };

 

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Update Tool</h3>
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
              Update Tool
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
