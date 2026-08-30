import { MobileMainScreen } from './MobileMainScreen';
import { MenuCatalogSection } from '../menu/MenuCatalogSection';

export function MobileApplication() {
  return (
    <div id="canger-mobile-application" className="w-full min-h-screen bg-[#25140e] scroll-smooth">
      {/* SCREEN-03: Reflowed Natural-Flow Mobile Hero Application */}
      <MobileMainScreen />

      {/* SCREEN-04: Rich Full Product Cards, Combos & Shakes Banners, Footer */}
      <MenuCatalogSection />
    </div>
  );
}

