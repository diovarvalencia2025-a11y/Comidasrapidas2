import { DesktopAppNav } from './DesktopAppNav';
import { DesktopMainScreen } from './DesktopMainScreen';
import { MenuCatalogSection } from '../menu/MenuCatalogSection';

export function DesktopApplication() {
  return (
    <div id="canger-desktop-application" className="relative w-full min-h-screen overflow-x-hidden bg-[#25140e] scroll-smooth">
      {/* SCREEN-02: Real Fixed Application Navigation */}
      <DesktopAppNav />

      {/* SCREEN-01: Scaled Hero Stage Canvas */}
      <DesktopMainScreen />

      {/* SCREEN-03: Complete Rich Product Catalog, Banners & Footer (From User Design Reference) */}
      <MenuCatalogSection />
    </div>
  );
}

