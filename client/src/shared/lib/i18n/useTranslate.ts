import { useTranslation } from 'react-i18next';
import i18n from '../../config/i18n/i18n';

interface useTranslateProps {
  translateKey: string;
  options?: Record<string, unknown>;
  returnObjects?: boolean;
  document?: string;
}

export const useTranslate = <T = string>({
  translateKey,
  options = {},
  returnObjects = false,
  document = undefined,
}: useTranslateProps) => {
  const { t } = useTranslation(document);
  const lang = i18n.language;
  const translateVariables = t(translateKey, {
    returnObjects: returnObjects,
    ...options,
  }) as T;

  return { translateVariables, lang };
};
