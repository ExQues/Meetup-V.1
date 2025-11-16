import { Dock, DockItem, DockIcon, DockLabel } from "@/components/layout/DockNavigation";
import { Link } from "react-router-dom";
import { Home, FileText, Users } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="fixed left-0 right-0 top-12 z-50 bg-transparent">
        <div className="flex justify-center px-6">
          <Dock className="bg-black/40 border border-white/10 backdrop-blur-sm" panelHeight={48} magnification={64} distance={120}>
            <Link to="/" className="contents">
              <DockItem>
                <DockIcon>
                  <Home className="w-6 h-6 text-white" />
                </DockIcon>
                <DockLabel>Início</DockLabel>
              </DockItem>
            </Link>
            <Link to="/formulario" className="contents">
              <DockItem>
                <DockIcon>
                  <FileText className="w-6 h-6 text-white" />
                </DockIcon>
                <DockLabel>Formulário</DockLabel>
              </DockItem>
            </Link>
            <Link to="/comunidade" className="contents">
              <DockItem>
                <DockIcon>
                  <Users className="w-6 h-6 text-white" />
                </DockIcon>
                <DockLabel>Comunidade</DockLabel>
              </DockItem>
            </Link>
          </Dock>
        </div>
      </header>
      <main className="pt-28">
        {children}
      </main>
    </div>
  );
}