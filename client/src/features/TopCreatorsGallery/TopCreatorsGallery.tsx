import { TopCreatorsCard } from '../../widgets/TopCreators/ui/molecules/TopCreatorsCard';

export const TopCreatorsGallery = () => {
  const testArray = Array.from({ length: 12 }, () => []);

  return (
    <div className="grid grid-cols-4 gap-7">
      {testArray.map((elem, i) => {
        return <TopCreatorsCard key={i} index={i + 1} />;
      })}
    </div>
  );
};
