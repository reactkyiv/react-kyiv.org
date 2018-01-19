import React from 'react';
import Link from 'next/link';

import Button from '../components/Button';

export default () => {
    return (
        <div>
            <body>
                <span>Soon you will see beautiful React Kyiv website here written in Next.js</span>
                <br/>
                <Link href="/about">
                    <a>To About page</a>
                </Link>
                <br />
                <Button label="Test button" />
            </body>
        </div>
    );
}