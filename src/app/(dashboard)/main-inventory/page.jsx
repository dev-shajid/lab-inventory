import Products from '@/components/Products';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function MainInventory() {
    return (
        <section className="container">
            <div className="gallery">
                <Products />
            </div>
        </section>
    );
}
