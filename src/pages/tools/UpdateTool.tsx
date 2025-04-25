import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, FileInput, Select, MultiSelect } from '../../common/FormInputs'; 
import { useParams } from 'react-router-dom';

const UpdateTool = () => {
  const { id } = useParams(); 
  const { handleSubmit, control, reset } = useForm();

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const response = await fetch(` http://localhost:8080/getToolById/${id}`);
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
      const response = await fetch(`http://localhost:8080/tools/${id}`, {
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

  const pricingTypes = [
    { value: 'freemium', label: 'Freemium' },
    { value: 'trial', label: 'Trial' },
    { value: 'premium', label: 'Premium' },
  ];

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Update Tool</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <Input
              name="title"
              control={control}
              label="Title"
              placeholder="Enter tool title"
            />
            <Input
              name="category"
              control={control}
              label="Category"
              placeholder="Enter tool category"
            />
            <Input
              name="description"
              control={control}
              label="Description"
              placeholder="Enter a short description"
            />
            <Input
              name="longDescription"
              control={control}
              label="Long Description"
              placeholder="Enter a detailed description"
            />
            <Input
              name="visit_link"
              control={control}
              label="Visit Link"
              placeholder="Enter the tool's website link"
            />
            <Input
              name="pricing.price"
              control={control}
              label="Price"
              placeholder="Enter the price"
            />
            <Select
              name="pricing.type"
              control={control}
              label="Pricing Type"
              options={pricingTypes}
            />
            <Input
              name="pricing.pricing_url"
              control={control}
              label="Pricing URL"
              placeholder="Enter pricing URL (optional)"
            />
            <FileInput
              name="pricing.pricing_image"
              control={control}
              label="Pricing Image"
            />
            <Input
              name="firebase_image_url"
              control={control}
              label="Firebase Image URL"
              placeholder="Enter Firebase image URL"
            />
            <Select
              name="status"
              control={control}
              label="Status"
              options={[
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' },
              ]}
            />
            <Input
              name="visit_count"
              control={control}
              label="Visit Count"
              placeholder="Enter the number of visits"
            />
            <Input
              name="isFree"
              control={control}
              label="Is Free?"
              placeholder="true/false"
            />
            <Input
              name="isVerified"
              control={control}
              label="Is Verified?"
              placeholder="true/false"
            />
            <MultiSelect
              name="tags"
              control={control}
              label="Tags"
              options={[
                { value: 'tag1', label: 'Tag 1' },
                { value: 'tag2', label: 'Tag 2' },
                { value: 'tag3', label: 'Tag 3' },
              ]}
            />
            <Input
              name="ranking"
              control={control}
              label="Ranking"
              placeholder="Enter the ranking"
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

export default UpdateTool;
