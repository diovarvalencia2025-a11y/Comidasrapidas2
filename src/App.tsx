/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider } from './context/AppContext';
import { ApplicationShell } from './components/ApplicationShell';

export default function App() {
  return (
    <AppProvider>
      <ApplicationShell />
    </AppProvider>
  );
}

