import { Image } from '../../../shared/ui/atoms';
import Astronaut from '../../../shared/assets/images/weeklyDigest/astronaut.png';
import { SectionHeader } from '../../../shared/ui/molecules/SectionHeader';
import SubscribeByEmail from '../../../features/SubscribeByEmail/ui/SubscribeByEmail';

const WeeklyDigest = () => {
  return (
    <section className="main-padding-responsive">
      <div
        className="text-primary-text-color
       overflow-hidden rounded-2xl flex items-center 
       weeklyDigestContainer"
      >
        <div className="weeklyDigestImage rounded-2xl overflow-hidden">
          <Image alt="test" src={Astronaut} />
        </div>
        <div className="weeklyDigestText flex flex-col justify-center ">
          <SectionHeader
            responsive={false}
            title="Join Our Weekly Digest"
            description="Get exclusive promotions & updates straight to your inbox."
            className="mb-10"
          />
          <SubscribeByEmail />
        </div>
      </div>
    </section>
  );
};

export default WeeklyDigest;
