import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditForm = () => {
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

    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        fetchEmployeeData();
    }, []);


    const fetchEmployeeData = async () => {
        console.log("id is ")
        try {
            const response = await fetch(`http://localhost:3000/employees/${params.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch client details.');
            }
            const data = await response.json();
            console.log(data)
            setName(data.name);
            setMobile(data.mobile);
            setEmail(data.email);
            setId(data.id);
            setAddress(data.address);
            setJoiningDate(data.designation);
            setDesignation(data.joiningDate);
            setCompanyName(data.gender);
            setGender(data.companyName);
            setDesignationExperience(data.designationExperience);
            setTimePeriod(data.timePeriod);

        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (id, updatedData) => {
        try {
            const response = await fetch(`http://localhost:3000/employee/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update client.');
            }

            // Refetch clients after successful update
            fetchClients();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="w-full max-w-xs flex justify-center items-center my-[100px]">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Name
                    </label>
                    <input value={name} onChange={(e) => { setName(e.target.value) }} className="shadow appearance-none border border-red-500  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Username" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Mobile
                    </label>
                    <input value={mobile} onChange={(e) => { setMobile(e.target.value) }} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="mobile" type="text" placeholder="Enter your age" />
                    {/* <p className="text-red-500 text-xs italic">Enter your age</p> */}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Email
                    </label>
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="enter your address" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        ID
                    </label>
                    <input value={id} onChange={(e) => { setId(e.target.value) }} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="id" type="text" placeholder="enter your address" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Address
                    </label>
                    <input value={address} onChange={(e) => { setAddress(e.target.value) }} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="enter your address" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Designation
                    </label>
                    <input value={designation} onChange={(e) => { setDesignation(e.target.value) }} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="designation" type="text" placeholder="enter your address" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        JoiningDate
                    </label>
                    <input value={joiningDate} onChange={(e) => { setJoiningDate(e.target.value) }} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="joiningDate" type="text" placeholder="enter your address" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Gender
                    </label>
                    <input value={gender} onChange={(e) => { setGender(e.target.value) }} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="gender" type="text" placeholder="enter your address" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        CompanyName
                    </label>
                    <input value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="companyName" type="text" placeholder="enter your address" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Designation Experience
                    </label>
                    <input value={designationExperience} onChange={(e) => { setDesignationExperience(e.target.value) }} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="designationExperience" type="text" placeholder="enter your address" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Time Period
                    </label>
                    <input value={timePeriod} onChange={(e) => { setTimePeriod(e.target.value) }} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="timePeriod" type="text" placeholder="enter your address" />
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={() => handleEdit(params.id, { name, mobile, email, id, address, designation, joiningDate, gender, companyName, designationExperience, timePeriod })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Edit User
                    </button>

                </div>
            </form>

        </div>
    )
}

export default EditForm


