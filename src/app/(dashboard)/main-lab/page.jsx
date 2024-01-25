import Products from '@/components/Products';
import Link from 'next/link';
import ManagerAction from './ManagerAction';
import InfoTable from '@/components/InfoTable';

export default function MainInventory() {
    return (
        <section className="container space-y-4">
            <InfoTable user={userDetails} />
            <ManagerAction />
        </section>
    );
}

const userDetails = {
    fullName: "Shafiqul Islam",
    email: "shafiqcuet1980@gmail.com",
    phoneNumber: "8801670393288",
    designation: "Lab Manager",
}