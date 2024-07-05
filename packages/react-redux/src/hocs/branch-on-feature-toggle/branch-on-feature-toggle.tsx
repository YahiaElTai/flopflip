import type { TFlagName, TFlagVariation } from '@flopflip/types';
// biome-ignore lint/style/useImportType: <explanation>
import React from 'react';

import { useFeatureToggle } from '../../hooks';

type TBranchOnFeatureToggleOptions = {
  flag: TFlagName;
  variation?: TFlagVariation;
};
export default function branchOnFeatureToggle<
  OwnProps extends Record<string, unknown>,
>(
  { flag: flagName, variation: flagVariation }: TBranchOnFeatureToggleOptions,
  UntoggledComponent?: React.ComponentType
) {
  return (ToggledComponent: React.ComponentType<OwnProps>) => {
    function WrappedToggledComponent(ownProps: OwnProps) {
      const isFeatureEnabled = useFeatureToggle(flagName, flagVariation);

      if (isFeatureEnabled) {
        return <ToggledComponent {...ownProps} />;
      }
      if (UntoggledComponent) {
        return <UntoggledComponent {...ownProps} />;
      }
      return null;
    }

    return WrappedToggledComponent;
  };
}
