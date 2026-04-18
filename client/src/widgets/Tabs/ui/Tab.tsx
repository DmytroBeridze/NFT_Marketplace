import type { ReactNode } from 'react';
import { useAuthorizationContext } from '../../../features/AuthorizationModal/context';

type TabProps = {
  name: string;
  children: ReactNode;
};

export const Tab = ({ name, children }: TabProps) => {
  const { setTab, tab } = useAuthorizationContext();
  const active = name === tab;
  return (
    <div
      className={`relative cursor-pointer   ${active ? ' z-20 mr-[-20px] ' : ' z-0 mr-[-20px]  '}`}
      onClick={() => setTab(name as 'login' | 'signUp')}
    >
      <svg
        viewBox="0 0 93.85 24.26"
        className={`-my-[11px] w-[140px] h-[60px]  block  ${active ? 'text-secondary-text-color' : 'static-text-purple-color'}  `}
        // className={`w-[140px] h-[60px] block  ${active ? 'text-secondary-text-color' : 'static-text-purple-color'}  `}
      >
        <defs>
          <filter id="tabShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="-2"
              stdDeviation="3"
              floodColor="black"
              floodOpacity="0.18"
            />

            <feDropShadow
              dx="-2"
              dy="-1"
              stdDeviation="2"
              floodColor="black"
              floodOpacity="0.12"
            />

            <feDropShadow
              dx="2"
              dy="-1"
              stdDeviation="2"
              floodColor="black"
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        <path
          d="m93.85,24.26c-5.21-2.07-9.07-7.2-10.26-12.87v.02c-1.8-6.57-7.78-11.41-14.92-11.41H7.73C3.46,0,0,3.46,0,7.73v16.53h93.85Z"
          fill="currentColor"
          filter="url(#tabShadow)"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
