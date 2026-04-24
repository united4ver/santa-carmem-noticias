/**
 * Rota administrativa — Sanity Studio embutido.
 * Tudo que vier em /admin/... é tratado pelo próprio Studio.
 * O login é feito pelo Sanity (Google OAuth, e-mail, 2FA opcional).
 */

'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function AdminPage() {
  return <NextStudio config={config} />;
}
