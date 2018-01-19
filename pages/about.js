import React from 'react';
import Link from 'next/link';

import Page from '../components/Page';

export default () => {
    return (
        <Page>
            <Link href="/">
                <a>BACK</a>
            </Link>
        </Page>
    );
}