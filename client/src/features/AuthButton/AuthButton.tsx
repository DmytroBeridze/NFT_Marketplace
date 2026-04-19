import type { MouseEventHandler } from 'react';
import { useLocalStorage } from '../../shared/lib/hooks';
import { Button, Icon, Text } from '../../shared/ui/atoms';
import { useTranslation } from 'react-i18next';
import type { TextFont } from '../../shared/ui/atoms/Text/Text.types';

type AuthButtonProps = {
  handler: MouseEventHandler<HTMLButtonElement>;
  font?: TextFont;
};

const AuthButton = ({
  handler,
  font = 'font-work-sans-semibold',
}: AuthButtonProps) => {
  const { t } = useTranslation();
  const { getLocal } = useLocalStorage();
  const token = getLocal('token');
  return (
    <Button
      data-testid="login-btn"
      onClick={handler}
      className="py-3 px-4  lg:py-5 lg:px-7 flex gap-3 items-center whitespace-nowrap "
      radius="xl"
    >
      {token ? (
        <Icon
          name={'user-icon'}
          size={14}
          className="lg:w-5 lg:h-5 text-white"
        />
      ) : (
        <Icon
          name={'door-icon'}
          size={16}
          className="lg:w-6 lg:h-6 text-white"
        />
      )}

      <Text
        Element="p"
        font={font}
        // font="font-work-sans-semibold"
        size="responsive-size-sm"
        color="static-text-white-color"
      >
        {token ? t('button.signOut') : t('button.signIn')}
      </Text>
    </Button>
  );
};

export default AuthButton;
