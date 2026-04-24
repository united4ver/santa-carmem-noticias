// Layout minimalista — o Sanity Studio ocupa a tela inteira, sem o header/footer do site.
export const metadata = {
  title: 'Painel administrativo',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
