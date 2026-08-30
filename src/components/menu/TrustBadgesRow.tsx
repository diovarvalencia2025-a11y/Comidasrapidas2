import React from 'react';
import { TRUST_BADGES } from '../../constants';

export function TrustBadgesRow() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-b border-black/10 my-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4">
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge.id}
            className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/40 backdrop-blur-xs border border-white/40 shadow-2xs hover:bg-white/70 transition-colors"
          >
            <div className="size-11 rounded-full bg-[#ffd689] flex items-center justify-center text-xl shrink-0 shadow-xs">
              <span>{badge.icon}</span>
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-black text-gray-900 leading-tight">
                {badge.title}
              </h5>
              <p className="text-[11px] text-gray-600 font-medium">
                {badge.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
