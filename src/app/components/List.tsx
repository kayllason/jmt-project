import Card from './Card';
import { mockData } from './../constants/foodData';

export default function List() {
  return (
    <div className="px-20">
      <div className="flex flex-wrap justify-start gap-4 ">
        {mockData.map(foodData => {
          return <Card key={foodData.id} foodData={foodData} />;
        })}
      </div>
    </div>
  );
}
