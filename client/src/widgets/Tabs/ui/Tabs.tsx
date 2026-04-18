import { useTranslate } from '../../../shared/lib/i18n';
import { Content } from './Content';

import { Tab } from './Tab';

const Tabs = () => {
  const { translateVariables } = useTranslate({
    translateKey: 'modal.tabs',
    returnObjects: true,
  });
  const buttonsNames = Object.entries(translateVariables);

  return (
    <section className="flex flex-col  max-[834px]:self-start   pr-4 pb-4 pl-4">
      {/* ---------tabs */}

      <div className="flex ">
        {buttonsNames.map(([key, value]) => (
          <Tab key={key} name={key}>
            {value}
          </Tab>
        ))}
      </div>

      {/* --------content */}
      <Content />
    </section>
  );
};

export default Tabs;
