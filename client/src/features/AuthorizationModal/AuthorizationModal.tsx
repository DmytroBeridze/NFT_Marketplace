import { useToggleOverlay } from '../../shared/ui/molecules/Overlay';

export const AuthorizationModal = () => {
  const { closeHandler } = useToggleOverlay();
  const buttonsName = ['Login', 'Sign Up'] as const;

  return (
    <>
      <button onClick={() => closeHandler()}>Test btn</button>
      <div className=" w-full h-full max-w-150 max-h-120 bg-static-surface rounded-lg">
        <ul className="w-full  flex justify-between">
          {buttonsName.map((elem, i) => {
            return (
              <li
                key={elem}
                className={`flex justify-center items-center basis-1/2 p-5 cursor-pointer  ${i === 1 ? 'rounded-tr-lg' : 'rounded-tl-lg'} bg-amber-200`}
                onClick={() => console.log('click')}
              >
                {elem}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
