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
  fullName: "Md. Aminul Islam Khadem",
  email: "khadem1986@gmail.com",
  phoneNumber: "01878715150",
  designation: "Lab Assistant",
}