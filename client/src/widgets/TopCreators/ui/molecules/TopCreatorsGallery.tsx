import { CardNumber } from '../atoms';

export const TopCreatorsGallery = () => {
  return (
    <div className="grid grid-cols-4 gap-7">
      {/* --------------- */}
      <article
        className="bg-secondary-background-color 
      shadow-secondary rounded-2xl p-5 relative"
      >
        <CardNumber />
        sfdghdrtjh
      </article>
      {/* ------------- */}
      <article
        className="  bg-secondary-background-color 
      shadow-secondary rounded-2xl"
      >
        sfdghdrtjh
      </article>
      <article
        className=" bg-secondary-background-color 
      shadow-secondary rounded-2xl"
      >
        sfdghdrtjh
      </article>
      <article
        className="  bg-secondary-background-color 
      shadow-secondary rounded-2xl"
      >
        sfdghdrtjh
      </article>
    </div>
  );
};
