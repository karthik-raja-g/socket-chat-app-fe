import "./App.css";
import Login from "./components/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./components/Dashboard";
import { ContactsProvider } from "./contexts/contacts";
function App() {
  const [id, setId] = useLocalStorage("id");
  const dashborad = (
    <ContactsProvider>
      <Dashboard id={id} />
    </ContactsProvider>
  );
  return id ? dashborad : <Login onSubmit={setId} />;
}

export default App;
