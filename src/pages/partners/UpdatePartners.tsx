import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Select } from '../../common/FormInputs';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../../common/siteConstants';
import { toast } from 'sonner';
import { IoIosArrowBack } from "react-icons/io";

const UpdatePartners = () => {
    const { id } = useParams();
    const { handleSubmit, control, reset, setValue, watch } = useForm();

    const [mainServices] = useState([
        { value: 'webDevelopment', label: 'Web Development' },
        { value: 'mobileDevelopment', label: 'Mobile Development' },
        { value: 'digitalMarketing', label: 'Digital Marketing' },
        { value: 'itConsulting', label: 'IT Consulting' }
    ]);
    const [subServices, setSubServices] = useState([]);

    const subServiceOptions = {
        webDevelopment: [
            { value: 'frontendDevelopment', label: 'Frontend Development' },
            { value: 'backendDevelopment', label: 'Backend Development' },
            { value: 'fullStackDevelopment', label: 'Full Stack Development' },
            { value: 'ecommerceDevelopment', label: 'E-commerce Development' },
            { value: 'cmsDevelopment', label: 'CMS Development' }
        ],
        mobileDevelopment: [
            { value: 'androidDevelopment', label: 'Android Development' },
            { value: 'iosDevelopment', label: 'iOS Development' },
            { value: 'flutterDevelopment', label: 'Flutter Development' }
        ],
        digitalMarketing: [
            { value: 'seo', label: 'SEO' },
            { value: 'socialMediaMarketing', label: 'Social Media Marketing' },
            { value: 'contentMarketing', label: 'Content Marketing' }
        ],
        itConsulting: [
            { value: 'cloudComputing', label: 'Cloud Computing' },
            { value: 'cyberSecurity', label: 'Cyber Security' },
            { value: 'itSupport', label: 'IT Support' }
        ]
    };

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/getPartnerById/${id}`);
                if (!response.ok) throw new Error('Failed to fetch partner');

                const partnerData = await response.json();
                toast.success('Partner data loaded');

                reset(partnerData);

                // Set services and corresponding sub-services
                if (partnerData.selectedServices?.length > 0) {
                    const selectedMain = partnerData.selectedServices;
                    setValue('selectedServices', selectedMain);

                    const allSubOptions = selectedMain.flatMap(service => subServiceOptions[service] || []);
                    setSubServices(allSubOptions);

                    // Optional: Filter sub-services in case some are invalid
                    const filteredSub = (partnerData.selectedSubServices || []).filter(sub =>
                        allSubOptions.some(opt => opt.value === sub)
                    );
                    setValue('selectedSubServices', filteredSub);
                }
            } catch (error) {
                console.error('Error fetching partner:', error);
                toast.error('Error loading partner data');
            }
        };

        fetchPartner();
    }, [id, reset, setValue]);

    const handleMainServiceChange = (selectedMainServices: any[]) => {
        setValue('selectedServices', selectedMainServices);

        if (selectedMainServices.length > 0) {
            const newSubOptions = selectedMainServices.flatMap(service => subServiceOptions[service.value] || []);
            setSubServices(newSubOptions);
        } else {
            setSubServices([]);
        }

        setValue('selectedSubServices', []);
    };

    const onSubmit = async (data: any) => {
        try {
            const response = await fetch(`${BASE_URL}/api/updatePartnerById/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to update partner');

            const result = await response.json();
            toast.success('Partner updated successfully');
            console.log('Update response:', result);
        } catch (error) {
            console.error('Update error:', error);
            toast.error('Update failed');
        }
    };

    return (
        <div>
            <Link to="/partners">
                <IoIosArrowBack className="font-bold text-[40px] bg-orange-100 rounded-lg p-2" />
            </Link>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">Update Partner</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6.5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input name="companyName" control={control} label="Company Name" placeholder="Enter company name" />
                        <Input name="contactPerson" control={control} label="Contact Person" placeholder="Enter contact person's name" />
                        <Input name="email" control={control} label="Email" placeholder="Enter email address" />
                        <Input name="phone" control={control} label="Phone" placeholder="Enter phone number" />
                        <Input name="address" control={control} label="Address" placeholder="Enter address" />
                        <Input name="country" control={control} label="Country" placeholder="Enter country" />
                        <Input name="state" control={control} label="State" placeholder="Enter state" />
                        <Input name="city" control={control} label="City" placeholder="Enter city" />
                        <Input name="pincode" control={control} label="Pincode" placeholder="Enter pincode" />

                        <Select
                            name="selectedServices"
                            control={control}
                            label="Selected Services"
                            options={mainServices}
                            isMulti
                            onChange={handleMainServiceChange}
                        />

                        <Select
                            name="selectedSubServices"
                            control={control}
                            label="Selected Sub-Services"
                            options={subServices}
                            isMulti
                        />
                    </div>

                    <div className="px-6.5 pb-6.5">
                        <button
                            type="submit"
                            className="w-full rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                        >
                            Update Partner
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePartners;
