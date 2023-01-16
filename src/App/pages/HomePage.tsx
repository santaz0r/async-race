function HomePage() {
  const kek = fetch('http://127.0.0.1:3000/garage').then((data) => data);
  console.log(kek);
  return <h1>Homepage</h1>;
}

export default HomePage;
