import { useIsDesktop } from '../hooks/useIsDesktop';
import { DesktopApplication } from './desktop/DesktopApplication';
import { MobileApplication } from './mobile/MobileApplication';

/**
 * ResponsiveStage
 * Mounts strictly ONE interface at a time based on media query.
 * Never mounts both simultaneously or toggles with CSS display classes.
 */
export function ResponsiveStage() {
  const isDesktop = useIsDesktop();

  return isDesktop ? <DesktopApplication /> : <MobileApplication />;
}
