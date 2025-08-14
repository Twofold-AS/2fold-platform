'use client';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';

export default function AdaptiveLogo() {
    const { theme } = useTheme();

    const logoSrc = theme === 'dark'
        ? '/logos/twofold-white.png'
        : '/logos/twofold-black.png';

    return (
        <Link href="/">
            <Image
                src={logoSrc}
                alt="Twofold"
                width={2158}
                height={712}
                className="h-12 -my-1 w-auto"
                quality={100}
                priority
                style={{
                    opacity: 1,
                    filter: 'contrast(1.1) saturate(1.2)',  // Mer kontrast og farge
                    imageRendering: 'crisp-edges'
                }}
            />
        </Link>
    );
}