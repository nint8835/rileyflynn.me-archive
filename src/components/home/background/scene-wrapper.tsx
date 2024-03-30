import { useMediaQuery } from '@uidotdev/usehooks';
import React, { Suspense } from 'react';

const BackgroundCanvas = React.lazy(() => import('./scene'));

export function SceneWrapper() {
    const isSmallDevice = useMediaQuery('(max-width: 640px)');

    if (isSmallDevice) {
        return null;
    }

    return (
        <Suspense>
            <BackgroundCanvas />
        </Suspense>
    );
}
