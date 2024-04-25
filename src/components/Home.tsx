const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      <button
        className={'bg-blue-500 text-white p-2 rounded'}
        onClick={() => {
          window.openNewWindow();
        }}
      >open popup</button>
    </div>
  );
};

export default Home;
