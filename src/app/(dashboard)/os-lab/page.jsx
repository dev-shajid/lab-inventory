import InfoTable from '@/components/InfoTable';
import LabTable from '@/components/LabTable';

export default function Lab1() {
  return (
    <section className="container overflow-hidden h-[200vh] space-y-6">
      <InfoTable user={userDetails} />
      <LabTable lists={lists} />
    </section>
  );
}

const userDetails = {
  fullName: "Md. Aminul Islam Khadem",
  email: "khadem1986@gmail.com",
  phoneNumber: "01878715150",
  designation: "Lab Assistant",
}


const lists = [
  {
    image: '/os/1.JPG',
    name: 'Ethernet cable',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/os/2.JPG',
    name: 'UPS',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/os/3.JPG',
    name: 'CPU',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/os/4.JPG',
    name: 'Monitor',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/os/5.JPG',
    name: 'Mouse',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/os/6.JPG',
    name: 'Keyboard',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/os/7.JPG',
    name: 'Gpu',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/os/8.JPG',
    name: 'Projector',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/os/9.JPG',
    name: 'Multiplug',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
]
