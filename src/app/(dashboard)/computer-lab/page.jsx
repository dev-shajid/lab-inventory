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
  fullName: "Prabir kanti Biswas",
  email: "prabir.bisw@gmail.com",
  phoneNumber: "01618-989050",
  designation: "Lab Assistant",
}




const lists = [
  {
      image: '/lab1/pc.jpeg',
      name: 'PC',
      description: 'This is a very long text that describes the item.',
      available: 12,
      damaged: 3,
  },
  {
      image: '/lab1/ups.png',
      name: 'UPS',
      description: 'This is a very long text that describes the item.',
      available: 15,
      damaged: 2,
  },
]