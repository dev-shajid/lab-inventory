import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function MainInventory() {
    return (
        <section className="container">
            <div className="gallery">
                <div className="title">Gallery</div>
                <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, i) => (
                            <Link href={`/main-inventory/${item}`}>
                                <div className='bg-gray-400 rounded-md grid place-content-center w-full aspect-square'>
                                    <p className='text-2xl text-white font-semibold'>{item}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
