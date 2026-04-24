import type { Metadata, Viewport } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif', display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santacarmemnoticias.com.br';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Santa Carmem Notícias';
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Notícias locais de Santa Carmem/MT`,
    template: `%s | ${siteName}`,
  },
  description:
    'Portal de notícias de Santa Carmem, Mato Grosso. Cobertura local de política municipal, segurança, agronegócio, esportes, cultura e eventos.',
  applicationName: siteName,
  keywords: [
    'Santa Carmem',
    'notícias Santa Carmem',
    'Mato Grosso',
    'MT',
    'agronegócio',
    'política municipal',
    'prefeitura',
    'polícia',
    'esportes',
    'cultura',
  ],
  authors: [{ name: siteName }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName,
    title: `${siteName} — Notícias locais de Santa Carmem/MT`,
    description:
      'Portal de notícias de Santa Carmem, Mato Grosso. Política, segurança, agronegócio e cultura.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: `${siteName} — O jornal digital da nossa cidade`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: 'Notícias locais de Santa Carmem/MT',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg' }],
    shortcut: ['/favicon.svg'],
  },
  manifest: '/site.webmanifest',
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

// Viewport: cor da barra do navegador no mobile (Chrome Android, Safari iOS).
// Usa verde-lavoura no claro e verde-cerrado no escuro.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1F6B3A' },
    { media: '(prefers-color-scheme: dark)', color: '#103E21' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('tema');var s=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&s)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-brand-700 focus:text-white focus:px-3 focus:py-2 focus:rounded">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />

        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}', { anonymize_ip: true });`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
