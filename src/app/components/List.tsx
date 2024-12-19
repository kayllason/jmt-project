import Card from './Card';

export default function List() {
  const foodData = ['pizza', 'pasta', 'kimbab', 'bulgogi', 'sushi', 'ramen', 'saled'];

  return (
    <div className="px-20">
      <div className="flex flex-wrap justify-start gap-4 ">
        {foodData.map((food, i) => {
          return <Card key={i} title={food} />;
        })}
      </div>
    </div>
  );
}
