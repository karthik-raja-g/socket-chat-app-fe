import "./App.css";
import Login from "./components/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./components/Dashboard";
import { ContactsProvider } from "./contexts/contacts";
import { ConversationsProvider } from "./contexts/conversations";
function App() {
  const [id, setId] = useLocalStorage("id");
  const dashborad = (
    <ContactsProvider>
      <ConversationsProvider>
      <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );
  return id ? dashborad : <Login onSubmit={setId} />;
}

export default App;
