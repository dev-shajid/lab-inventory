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
  fullName: "",
  email: "",
  phoneNumber: "",
  designation: "Lab Assistant",
}


const lists = [
  {
    image: '/micro/3.jpg',
    name: 'Breadboard',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/micro/8.JPG',
    name: 'Transistor',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/micro/7.JPG',
    name: 'Capacitor',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/micro/2.JPG',
    name: 'Resister',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/micro/6.JPG',
    name: 'Wire',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/micro/1.WEBP',
    name: 'IC',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
  {
    image: '/micro/5.JPG',
    name: 'Seven Segment Display',
    description: 'This is a very long text that describes the item.',
    available: 12,
    damaged: 3,
  },
]