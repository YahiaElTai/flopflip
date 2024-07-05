import { getIsFeatureEnabled, useAdapterContext } from '@flopflip/react';
import type { TFlagName, TFlagVariation, TFlags } from '@flopflip/types';

import useFlagsContext from '../use-flags-context';

export default function useFeatureToggles(flags: TFlags) {
  const adapterContext = useAdapterContext();
  const flagsContext = useFlagsContext();
  const requestedFlags: boolean[] = Object.entries(flags).reduce<boolean[]>(
    (previousFlags, [flagName, flagVariation]: [TFlagName, TFlagVariation]) => {
      const isFeatureEnabled: boolean = getIsFeatureEnabled(
        flagsContext,
        adapterContext.adapterEffectIdentifiers,
        flagName,
        flagVariation
      );

      previousFlags.push(isFeatureEnabled);

      return previousFlags;
    },
    []
  );

  return requestedFlags;
}
