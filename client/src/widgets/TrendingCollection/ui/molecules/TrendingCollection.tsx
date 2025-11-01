import { Image, Text } from '../../../../shared/ui/atoms';
import { SectionHeader } from '../../../../shared/ui/molecules/SectionHeader';
import plugImg from '../../../../shared/assets/images/plugImage.png';
import plugAvatar from '../../../../shared/assets/images/user_plug.png';

export const TrendingCollection = () => {
  return (
    <section className="main-padding-responsive">
      <SectionHeader
        title="Trending Collection"
        description=" Checkout our weekly updated trending collection."
      />

      <div className="grid grid-cols-3 gap-7 ">
        <article className="  grid grid-cols-3 gap-3.5">
          <div className="aspect-square col-start-1 col-end-4 rounded-[20px] overflow-hidden border border-emerald-700">
            <Image alt="avatar" src={plugImg} />
          </div>
          <div className="aspect-square rounded-[20px] overflow-hidden border border-emerald-700">
            <Image alt="avatar" src={plugImg} />
          </div>
          <div className="aspect-square rounded-[20px] overflow-hidden border border-emerald-700">
            <Image alt="avatar" src={plugImg} />
          </div>
          <div className="aspect-square rounded-[20px] overflow-hidden border border-emerald-700">
            <Image alt="avatar" src={plugImg} />
          </div>
          <div className=" col-start-1 col-end-4 overflow-hidden border border-emerald-700">
            <Text
              Element="h3"
              font="font-work-sans-semibold"
              size="t-text-md"
              color="text-primary-text-color"
            >
              DSGN Animals
            </Text>
            <div className="flex items-center gap-3">
              <Image
                alt="avatar"
                width="w-[24px]"
                height="h-[24px]"
                src={plugAvatar}
              />

              <Text
                Element="span"
                font="font-work-sans-regular"
                size="t-text-sm"
                color="text-primary-text-color"
              >
                MrFox
              </Text>
            </div>
          </div>
        </article>
        {/* --- */}
      </div>
    </section>
  );
};
