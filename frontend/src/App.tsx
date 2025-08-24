import { useEffect, useState } from 'react';

interface Person {
  id: number;
  name: string;
  age: number;
};

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  async function fetchPeople() {
    try {
      const res = await fetch("/api/person");
      const people: Person[] = await res.json();
      setPeople(people);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      {people.map(p => <Person person={p}></Person>)}
    </>
  );
}

function Person({ person }: { person: Person }) {
  return (
    <div id={`${person.id}`}>
      {Object.entries(person).map(([k, v]) =>
        <div key={k}>{k}: {v}</div>
      )}
    </div>
  );
}

export default App;
