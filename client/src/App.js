import './App.css';
import { useGetAllUsers } from './graphql/query/user';

function App() {

  const {getAllUsers, loading, data, error} = useGetAllUsers()

  console.log(data);
  console.log("ERROR...", error);
  
  return (
    <div className="App">
      <button onClick={async () => {
        await getAllUsers()
        console.log("DATA", data);
      }}>get</button>


      {loading && <p>Loading...</p>}
      {data && <p>Data</p>}

    </div>
  );
}

export default App;
