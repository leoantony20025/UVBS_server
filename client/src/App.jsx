import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Video from "./pages/Video";
import Audio from "./pages/Audio";
import Product from "./pages/Product";

function App() {
  const { user, accessToken } = useSelector((state) => state.user);

  console.log(user);

  const client = new ApolloClient({
    uri: "http://localhost:4001/graphql",
    cache: new InMemoryCache(),
    headers: {
      authorization: accessToken || "",
    },
  });

  return (
    <>
      <ApolloProvider client={client}>
        <div className="App">
          <Routes>
            {/* {user?.isAdmin && (
              <Route path="/admin/admins" element={<Admins />} />
            )}
            {user?.isAdmin && (
              <Route path="/admin/certificate" element={<Certificate />} />
            )}
            {user?.isAdmin && (
              <Route path="/admin/employee" element={<Employee />} />
            )}
            {user?.isAdmin && <Route path="/admin/skill" element={<Skill />} />}
            {user?.isAdmin && (
              <Route path="/admin/category" element={<Category />} />
            )} */}
            {user ? (
              <Route path="/product" element={<Product />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            {user ? (
              <Route path="/audio" element={<Audio />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            {user ? (
              <Route path="/video" element={<Video />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            {user ? (
              <Route path="/" element={<Dashboard />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
