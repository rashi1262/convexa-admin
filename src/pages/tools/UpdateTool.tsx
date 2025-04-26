import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Select } from '../../common/FormInputs'; 
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../../common/siteConstants';
import { toast } from 'sonner';
import { IoIosArrowBack, IoIosArrowRoundBack } from "react-icons/io";

const UpdateUser = () => {
  const { id } = useParams(); 
  const { handleSubmit, control, reset } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getUserById/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response,"responseresponse");
        
        const userData = await response.json();
        toast.success('User data loaded successfully');

        reset(userData); 
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to fetch user data');

      }
    };

    fetchUser();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/api/updateUserById/${id}`, {
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
      toast.success('User updated successfully');

      console.log('User updated:', result);
    } catch (error) {
      console.error('Error updating user:', error); 
      toast.error('Failed to update user');

    }
  };

  return (
    <div>
<Link  to="/tools">
<IoIosArrowBack className=" font-bold text-[40px] bg-orange-100 rounded-lg p-2" />
      </Link>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Update User</h3>

        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <Input name="name" control={control} label="Name" placeholder="Enter user name" />
            <Input name="email" control={control} label="Email" placeholder="Enter email address" />
            <Input name="referral" control={control} label="Referral Code" placeholder="Referral code" />
            <Select 
              name="role"
              control={control}
              label="Role"
              options={[
                { value: 'user', label: 'User' },
                { value: 'admin', label: 'Admin' },
              ]}
            />
            <Select 
              name="plan"
              control={control}
              label="Plan"
              options={[
                { value: 'Startup', label: 'Startup' },
                { value: 'Organizations', label: 'Organizations' },
                { value: 'Enterprise', label: 'Enterprise' },
              ]}
            />
            <Input name="photoURL" control={control} label="Photo URL" placeholder="Enter photo URL" />
            <Select 
              name="googleLogin"
              control={control}
              label="Google Login"
              options={[
                { value: true, label: 'True' },
                { value: false, label: 'False' },
              ]}
            />
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
            >
              Update User
            </button>


          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
