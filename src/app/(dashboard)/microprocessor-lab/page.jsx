import InfoTable from '@/components/InfoTable';
import LabTable from '@/components/LabTable';

export default function Lab1() {
  return (
    <section className="container overflow-hidden h-[200vh] space-y-6">
      <InfoTable user={userDetails} />
      <LabTable lab="microprocessor" />
    </section>
  );
}

const userDetails = {
  fullName: "",
  email: "",
  phoneNumber: "",
  designation: "Lab Assistant",
}