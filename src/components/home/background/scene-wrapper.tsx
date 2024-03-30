import { Transition } from '@headlessui/react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Suspense, lazy, useState } from 'react';

const BackgroundCanvas = lazy(() => import('./scene'));

export function SceneWrapper() {
    const isSmallDevice = useMediaQuery('(max-width: 640px)');
    const [showBackgroundCanvas, setShowBackgroundCanvas] = useState(!isSmallDevice);

    return (
        <>
            <Transition
                show={isSmallDevice}
                afterEnter={() => setShowBackgroundCanvas(false)}
                afterLeave={() => setShowBackgroundCanvas(true)}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute left-0 top-0 -z-10 w-full"
            >
                <div className="h-screen bg-black"></div>
                <div className="h-screen bg-blue-500"></div>
            </Transition>

            <div className="fixed left-0 top-0 -z-20 h-screen w-full bg-black">
                {showBackgroundCanvas && (
                    <Suspense>
                        <div className="flex h-full w-full flex-row">
                            <div className="flex-1"></div>
                            <div className="flex-1">
                                <BackgroundCanvas />
                            </div>
                        </div>
                    </Suspense>
                )}
            </div>
        </>
    );
}
