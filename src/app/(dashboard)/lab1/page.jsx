import { Button } from '@nextui-org/react';
import Table1 from './Table1'

export default function Lab1() {
  return (
    <section className="container overflow-hidden h-[200vh] space-y-6">
      <div className=''>
        <div className='title'>Info</div>
        <div className='info_table overflow-x-auto'>
          <table className="text-sm max-w-[400px] overflow-hidden text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              <tr>
                <th>Fullname</th>
                <td>{userDetails.fullName}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{userDetails.email}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{userDetails.phoneNumber}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{userDetails.gender}</td>
              </tr>
              <tr>
                <th>Designation</th>
                <td>{userDetails.designation}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      <Table1 />
    </section>
  );
}

const userDetails = {
  fullName: "Jhon Doe",
  email: "johndoe@gmail.com",
  phoneNumber: "+91876543210",
  dateOfBirth: "MM DD YYYY",
  bloodGroup: "AB+",
  gender: "Male",
  designation: "Lab Assistant",
}