import GiscusComponent from '@giscus/react';
import type { GiscusProps as GiscusComponentProps } from '@giscus/react';
import useTheme from '@/hooks/useTheme';
import { BASE_URL } from '@/constants';

export interface GiscusConfig extends Omit<GiscusComponentProps, 'id'> {}

import LightTheme from './giscus-tailwind-light.css?url';
import DarkTheme from './giscus-tailwind-dark.css?url';

export default function Giscus(props: GiscusConfig) {
  const { colorMode } = useTheme();
  const baseUrl = window.location.origin + BASE_URL;
  return (
    <GiscusComponent
      id="comments"
      theme={colorMode === 'dark' ? new URL(DarkTheme, baseUrl).toString() : new URL(LightTheme, baseUrl).toString()}
      {...props}
    />
  );
}