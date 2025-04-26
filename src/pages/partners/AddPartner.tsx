import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, MultiSelect } from '../../common/FormInputs'; // assuming you have Input & MultiSelect
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const AddPartner = () => {
  const { handleSubmit, control, reset, watch } = useForm();

  const services = [
    { name: 'Web Development', subServices: ['Frontend Development', 'Backend Development', 'Full Stack Development', 'E-commerce Development', 'CMS Development'] },
    { name: 'Mobile Development', subServices: ['iOS Development', 'Android Development', 'Cross Platform Development', 'Flutter Development', 'React Native Development'] },
    { name: 'Digital Marketing', subServices: ['Search Engine Optimization', 'Search Engine Marketing', 'Social Media Marketing', 'Content Marketing', 'Email Marketing'] },
    { name: 'IT Consulting', subServices: ['IT Strategy', 'Solution Architecture', 'Cloud Consulting', 'Security Consulting', 'Digital Transformation'] },
  ];

  // Convert services to MultiSelect options
  const serviceOptions = services.map((service) => ({
    value: service.name,
    label: service.name,
  }));

  // Watch selected services to dynamically show subservices
  const selectedServices = watch('selectedServices', []);

  // Build subservice options based on selected services
  const subServiceOptions = services
    .filter((service) => selectedServices.includes(service.name))
    .flatMap((service) =>
      service.subServices.map((sub) => ({
        value: sub,
        label: sub,
      }))
    );

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/partner/createPartner', data);
      console.log('Partner added successfully', response.data);
      reset(); // Clear form after successful submission
    } catch (error) {
      console.error('Error adding partner:', error);
    }
  };

  return (
    <div>
        <Link  to="/partners">
        <IoIosArrowBack className=" font-bold text-[40px] bg-orange-100 rounded-lg p-2" />
              </Link>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add Partner</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="companyName"
              control={control}
              label="Company Name"
              placeholder="Enter company name"
            />
            <Input
              name="contactPerson"
              control={control}
              label="Contact Person"
              placeholder="Enter contact person"
            />
            <Input
              name="email"
              control={control}
              label="Email"
              placeholder="Enter email address"
            />
            <Input
              name="phone"
              control={control}
              label="Phone"
              placeholder="Enter phone number"
            />
            <Input
              name="address"
              control={control}
              label="Address"
              placeholder="Enter address"
            />
            <Input
              name="country"
              control={control}
              label="Country"
              placeholder="Enter country"
            />
            <Input
              name="state"
              control={control}
              label="State"
              placeholder="Enter state"
            />
            <Input
              name="city"
              control={control}
              label="City"
              placeholder="Enter city"
            />
            <Input
              name="pincode"
              control={control}
              label="Pincode"
              placeholder="Enter pincode"
            />

            {/* Services MultiSelect */}
            <div className="col-span-1 md:col-span-2">
              <MultiSelect
                name="selectedServices"
                control={control}
                label="Select Services"
                options={serviceOptions}
              />
            </div>

            {/* SubServices MultiSelect */}
            {selectedServices.length > 0 && (
              <div className="col-span-1 md:col-span-2">
                <MultiSelect
                  name="selectedSubServices"
                  control={control}
                  label="Select Sub-Services"
                  options={subServiceOptions}
                />
              </div>
            )}

            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Add Partner
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPartner;
