import { ProviderLoginButtonEnhancer } from 'Layers/Behavior/ProviderLoginButtonEnhancer/ProviderLoginButtonEnhancer';

import { ProviderLoginButton as ProviderLoginButtonComponent, ProviderLoginButtonProps } from './ProviderLoginButton';

export const ProviderLoginButton = ProviderLoginButtonEnhancer<ProviderLoginButtonProps>()(
  ProviderLoginButtonComponent,
);