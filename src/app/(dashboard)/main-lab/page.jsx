import ManagerAction from './ManagerAction';
import InfoTable from '@/components/InfoTable';
import RequestTable from '@/components/RequestTable';

export default function MainInventory() {
    return (
        <section className="container space-y-4">
            <InfoTable role='manager' />
            <ManagerAction />
            <RequestTable role={'manager'} />
        </section>
    );
}