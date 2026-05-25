// src/app/servicos/admin/painelAdmin/layout.tsx

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}