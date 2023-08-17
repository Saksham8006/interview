import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom'
// import axios from 'axios';

const Home = () => {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [address, setAddress] = useState('')
  const [designation, setDesignation] = useState('')
  const [joiningDate, setJoiningDate] = useState('')
  const [gender, setGender] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [designationExperience, setDesignationExperience] = useState('')
  const [timePeriod, setTimePeriod] = useState('')
  const [employeeData, setEmployeeData] = useState([])


  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const handleIdChange = (e) => {
    setId(e.target.value);
    console.log(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    console.log(e.target.value);
  };
  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };
  const handleJoiningDateChange = (e) => {
    setJoiningDate(e.target.value);
  };
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };
  const handleDesignationExperienceChange = (e) => {
    setDesignationExperience(e.target.value);
  };
  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();


    const formData = {
      name,
      mobile,
      email,
      id,
      address,
      designation,
      joiningDate,
      gender,
      companyName,
      designationExperience,
      timePeriod
    };

    fetch('http://localhost:3000/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to save form data');
        }
        console.log('Form data saved successfully');
        toast.success('Successfully created!');
        return response.json();

      })
      .then((data) => {
        console.log(data);
        setName('');
        setMobile('');
        setEmail('');
        setId('');
        setAddress('');
        setJoiningDate('');
        setDesignation('');
        setCompanyName('');
        setGender('');
        setDesignationExperience('');
        setTimePeriod('');
      })
      .catch((error) => {
        console.error('Failed to save form data:', error);
      });
  };


  // useEffect(() => {
  //   handleSubmit();
  // }, [])

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch clients.');
      }
      const data = await response.json();
      setEmployeeData(data);
      console.log("hello", employeeData)
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/employee/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete client.');
      }
      // Refetch clients after successful deletion
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };





  return (
    <>
      <div className='min-h-screen m-6 p-6 '>
        <h1 className='text-2xl flex justify-center underline font-bold my-2 text-blue-700'>Task For Interview</h1>

        <Toaster />
        <div className='bg-gray-100 p-6'>
          {/* Employee Details */}

          <div className='px-6 py-5 '>
            <h2 className='text-xl font-semibold'>Employee Details</h2>
            <div className='flex gap-x-9 mt-2'>
              <div className='flex flex-col justify-start gap-y-[17px]'>
                <span>Employee Name :</span>
                <span>Employee Mob. :</span>
                <span>Employee Email :</span>
                <span>Employee ID :</span>
                <span>Employee Address :</span>
                <span>Employee Designation :</span>
                <span>Employee Joining date :</span>
                <span>Employee Gender :</span>

              </div>
              <div className='flex flex-col items-center justify-start gap-y-1' >
                <input
                  value={name}
                  onChange={handleNameChange}
                  type='text'
                  id='name'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-[7px]'
                  required
                />
                <input
                  value={mobile}
                  onChange={handleMobileChange}
                  type='text'
                  id='mobile'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-[7px]'
                  required
                />
                <input
                  value={email}
                  onChange={handleEmailChange}
                  type='text'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-[7px]'
                  required
                />
                <input
                  value={id}
                  onChange={handleIdChange}
                  type='text'
                  id='id'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-[7px]'
                  required
                />

                <input
                  value={address}
                  onChange={handleAddressChange}
                  type='text'
                  id='address'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-[7px]'
                  required
                />
                <input
                  value={designation}
                  onChange={handleDesignationChange}
                  type='text'
                  id='designation'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-[7px]'
                  required
                />
                <input
                  value={joiningDate}
                  onChange={handleJoiningDateChange}
                  type='text'
                  id='joiningDate'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-[7px]'
                  required
                />
                <input
                  value={gender}
                  onChange={handleGenderChange}
                  type='text'
                  id='gender'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-[7px]'
                  required
                />
                {/* <input
                value={breadth}
                onChange={handleBreadthChange}
                type='text'
                id='breadth'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-[7px]'
                required
              /> */}
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className='px-6 py-5 '>
            <h2 className='text-xl font-semibold'>Work Experience</h2>
            <div className='flex gap-x-9 mt-2'>
              <div className='flex flex-col justify-start gap-y-[17px]'>
                <span>Company Name </span>
                <span>Designation</span>
                <span>Time Period</span>

              </div>
              <div className='flex flex-col items-center justify-start gap-y-1' >
                <input
                  value={companyName}
                  onChange={handleCompanyNameChange}
                  type='text'
                  id='companyName'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-[7px]'
                  required
                />
                <input
                  value={designationExperience}
                  onChange={handleDesignationExperienceChange}
                  type='text'
                  id='designationExperience'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-[7px]'
                  required
                />
                <input
                  value={timePeriod}
                  onChange={handleTimePeriodChange}
                  type='text'
                  id='timePeriod'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-[7px]'
                  required
                />

              </div>
            </div>

            <button type="button" className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">+ Add Another Work Experience</button>

          </div>





          {/* Remove Button */}


          <div className='flex items-center justify-center '>
            <button onClick={handleSubmit} type="submit" className="text-white w-[300px] bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Submit Form</button>

          </div>


        </div>

      </div>

      {/* table part */}
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase">Address</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase">Designation</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase">JoiningDate</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase">Gender</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase">CompanyName</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase">DesignationExperience</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase">TimePeriod</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs  font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>

              {

                employeeData.map((data) => (


                  <tbody className="divide-y divide-gray-200 ">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">{data.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{data.mobile}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{data.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{data.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{data.designation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{data.joiningDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{data.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{data.companyName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{data.designationExperience}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{data.timePeriod}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{data.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap gap-x-3 flex  text-right text-sm font-medium">
                        <Link> <button onClick={() => handleDelete(data._id)} className="text-red-500 hover:text-red-700" to="#">Delete  </button></Link>
                        <Link to={"/edit/" + data._id}> <button className="text-blue-500 hover:text-blue-700" >Edit  </button></Link>
                        {/* <Link to="/view"> <button className="text-green-500 hover:text-green-700" >View  </button></Link> */}

                      </td>
                    </tr>

                  </tbody>
                ))

              }
            </table>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home