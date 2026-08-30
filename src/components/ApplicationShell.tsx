import { useApp } from '../context/AppContext';
import { ResponsiveStage } from './ResponsiveStage';
import { CartDrawer, SearchModal, ProductDetailModal, InfoModal, VideoManagerModal, Toast } from './modals/Modals';
import { BurgerGlyph, CheckIcon } from './icons/Icons';

export function ApplicationShell() {
  const {
    locationsOpen,
    setLocationsOpen,
    aboutOpen,
    setAboutOpen,
    signatureOpen,
    setSignatureOpen,
    selectedProduct,
    setSelectedProduct,
    showToast,
  } = useApp();

  return (
    <div id="canger-application-shell" className="relative w-full min-h-screen bg-[#009ca6] text-white">
      {/* Dynamic Responsive Stage (Desktop OR Mobile) */}
      <ResponsiveStage />

      {/* Global Interactive Modals & Drawers */}
      <CartDrawer />
      <SearchModal />
      <VideoManagerModal />
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Locations Modal */}
      <InfoModal
        title="Canger Smash Joints"
        isOpen={locationsOpen}
        onClose={() => setLocationsOpen(false)}
      >
        <div className="space-y-4">
          <p className="text-sm text-white/80">
            Hot griddles firing daily. Pick up in-store or smash curbside.
          </p>

          <div className="space-y-3">
            {[
              {
                name: 'Downtown Flagship',
                address: '428 S Broadway, Downtown',
                hours: '11:00 AM – 02:00 AM Daily',
                status: 'Open Now • Griddles Sizzling',
              },
              {
                name: 'Venice Boardwalk',
                address: '1312 Ocean Front Walk, Venice',
                hours: '11:30 AM – 12:00 AM Daily',
                status: 'Open Now • Beachside Patio',
              },
              {
                name: 'SoHo Smash Lab',
                address: '88 Spring Street, New York',
                hours: '12:00 PM – 01:00 AM Daily',
                status: 'Open Now • Late Night Window',
              },
              {
                name: 'Shoreditch Shack',
                address: '19 Redchurch St, London',
                hours: '12:00 PM – 11:00 PM Daily',
                status: 'Open Now • Pure Beef Power',
              },
            ].map((loc) => (
              <div
                key={loc.name}
                className="bg-white/10 rounded-2xl p-4 border border-white/15 hover:bg-white/15 transition-colors flex items-center justify-between"
              >
                <div>
                  <h4
                    className="text-xl font-bold uppercase tracking-tight text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {loc.name}
                  </h4>
                  <p className="text-xs text-white/80 mt-0.5">{loc.address}</p>
                  <p className="text-xs text-[#ffd689] font-medium mt-1">
                    {loc.hours} • <span className="text-[#5fd0d8]">{loc.status}</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    showToast(`Selected ${loc.name} for pickup`);
                    setLocationsOpen(false);
                  }}
                  className="px-3.5 py-2 rounded-full bg-white text-[#009ca6] text-xs font-bold uppercase tracking-wider hover:bg-[#ffd689] hover:text-black transition-colors cursor-pointer shrink-0"
                >
                  Order Here
                </button>
              </div>
            ))}
          </div>
        </div>
      </InfoModal>

      {/* About Modal */}
      <InfoModal
        title="Smash Not Boring"
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      >
        <div className="space-y-4 text-sm text-white/90 leading-relaxed">
          <div className="p-4 rounded-2xl bg-black/20 border border-white/15">
            <h4
              className="text-2xl font-bold uppercase text-[#ffd689] mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              The Unapologetic Bite
            </h4>
            <p className="text-white/85">
              We started Canger with one strict rule: no lukewarm pub burgers, no dry thick patties,
              no bland bread mountains. Pure high-heat smash craftsmanship only.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15">
              <span className="text-[#ffd689] font-bold text-xs uppercase tracking-wider block mb-1">
                400°F Hard Sear
              </span>
              <p className="text-xs text-white/80">
                Heavy cast-iron presses create maximum lacy Maillard crust.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15">
              <span className="text-[#ffd689] font-bold text-xs uppercase tracking-wider block mb-1">
                80/20 Angus Custom Blend
              </span>
              <p className="text-xs text-white/80">
                Course ground chuck & brisket for intense beef power.
              </p>
            </div>
          </div>

          <p className="text-xs text-white/70 italic pt-2">
            "Crispy edges, smoky char, and sauce that drips exactly where it should."
          </p>
        </div>
      </InfoModal>

      {/* Signature Modal */}
      <InfoModal
        title="Signature Blueprint"
        isOpen={signatureOpen}
        onClose={() => setSignatureOpen(false)}
      >
        <div className="space-y-3">
          <p className="text-sm text-white/85">
            Every layer in our signature stack is engineered for texture contrast and maximum savory drip.
          </p>

          <div className="space-y-2.5">
            {[
              {
                step: '01',
                title: 'Gold-Toasted Potato Brioche',
                desc: 'Steamed on the flat-top with butter and savory grill essence.',
              },
              {
                step: '02',
                title: 'Lacy Smash Crisps',
                desc: 'Micro-thin caramelised edges with crunch that snaps.',
              },
              {
                step: '03',
                title: 'Double Angus Patties',
                desc: 'Seared fast to lock deep juices into the center.',
              },
              {
                step: '04',
                title: 'Molten Smoked Cheddar',
                desc: 'Draped over sizzling beef under a stainless steam dome.',
              },
              {
                step: '05',
                title: 'Secret Canger Drip Sauce',
                desc: 'Tangy, smoky, and seasoned with house pickle brine.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3 bg-white/10 rounded-xl p-3 border border-white/15"
              >
                <span
                  className="text-lg font-bold text-[#ffd689] shrink-0"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.step}
                </span>
                <div>
                  <h5 className="font-bold text-sm text-white">{item.title}</h5>
                  <p className="text-xs text-white/75 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </InfoModal>

      {/* Toast Notification */}
      <Toast />
    </div>
  );
}
