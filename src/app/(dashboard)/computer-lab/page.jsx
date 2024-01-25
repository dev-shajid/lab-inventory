import InfoTable from '@/components/InfoTable';
import Table1 from './Table1'

export default function Lab1() {
  return (
    <section className="container overflow-hidden h-[200vh] space-y-6">
      <InfoTable user={userDetails} />
      <Table1 />
    </section>
  );
}


const userDetails = {
  fullName: "Prabir kanti Biswas",
  email: "prabir.bisw@gmail.com",
  phoneNumber: "01618-989050",
  designation: "Lab Assistant",
}