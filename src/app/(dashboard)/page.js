import BlurImage from "@/components/BlurImage";
import { ActionIcon, Button } from "@mantine/core";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";

export default function Home() {
  return (
    <section className="container space-y-6">
      {/* <div className="grid md:grid-cols-4 grid-col-2 gap-4">
        {
          items.map((item, i) => (
            <div key={i}>
              <div className="bg-white p-4 inline-flex flex-col justify-center items-center border border-gray-200 shadow-sm rounded-md">
                <div className="text-gray-500 font-medium text-sm">{item.title}</div>
                <div className="text-gray-900 font-bold md:text-3xl text-2xl mt-2">{item.total}</div>
              </div>
            </div>
          ))
        }
      </div> */}

      <div className="title text-center">Welcome, 👋 {'Shafiqul Islam'}</div>


      <div className="bg-white p-4 rounded-md border border-blight-1">
        <div className="title">About</div>
        <div className="space-y-8">
          <div className='flex flex-col gap-4 items-center justify-center'>
            <BlurImage
              className='w-[240px] aspect-square object-cover m-auto rounded-md'
              src="/images/cuet.png" alt="Profle"
            />
          </div>
          <div className="text">
            Chittagong University of Engineering & Technology (Bengali: চট্টগ্রাম প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয়), commonly referred to as CUET, is a public engineering and technological research university in Bangladesh located in Raozan Upazila under Chittagong District. Established in 1968 as Engineering College, Chittagong and gained autonomous graduate school status in 2003, this university is a state funded institution, maintaining special emphasis on teaching and research of engineering, technology, architecture and planning under five faculties and seventeen academic departments.
          </div>
        </div>
      </div>


      <div className="bg-white p-4 rounded-md border border-blight-1">
        <div className="title">Profile</div>
        <div className="space-y-6">
          <div className='flex flex-col gap-4 items-center justify-center'>
            <BlurImage
              className='w-[240px] aspect-square object-cover m-auto rounded-md'
              src="/images/avatar.png" alt="Profle"
            />
            <Button leftSection={<AiFillEdit size={14} />} variant='filled' size="xs">
              Edit
            </Button>
          </div>
          <div className='ditals'>
            <div className="user_details grid md:grid-cols-2 gap-4">
              {user_details.map((user, i) => (
                <div key={i} className="item flex flex-col">
                  <span className='text-sm text-gray-400'>{user.name}</span>
                  <span className='font-medium dark:text-white'>{user.info}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}

const user_details = [
  {
    name: "Fullname",
    info: 'Shafiqul Islam',
  },
  {
    name: "Designation",
    info: 'Lab Manager',
  },
  {
    name: "Email",
    info: 'shafiqcuet1980@gmail.com',
  },
  {
    name: "Phone",
    info: '8801670393288',
  },
  {
    name: "Gender",
    info: 'Male',
  },
  {
    name: "Date of Birth",
    info: '12 July, 2001',
  },
  {
    name: "Blood Group",
    info: 'AB+',
  },
  {
    name: "Religion",
    info: 'Islam',
  },
]



const items = [
  {
    title: 'Total Items',
    total: 124,
  },
  {
    title: 'Total Lab',
    total: 3,
  },
  {
    title: 'Total Item',
    total: 95,
  },
  {
    title: 'Total Damaged',
    total: 12,
  },
]