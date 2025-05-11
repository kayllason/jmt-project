import Nav from './components/Nav';
import List from './components/List';

export default function Home() {
  return (
    <>
      <Nav />
      <div className="pt-16">
        <List />
      </div>
    </>
  );
}
