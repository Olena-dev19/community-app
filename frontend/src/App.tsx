import { useSelector } from "react-redux";
import UserModal from "./components/UserModal/UserModal";
import HomePage from "./components/HomePage/HomePage";
import type { RootState } from "./app/store";
import Header from "./components/Header/Header";

function App() {
  const userName = useSelector((state: RootState) => state.user.name);
  if (!userName) {
    return <UserModal />;
  }

  return (
    <>
      <Header />
      <HomePage />;
    </>
  );
}

export default App;
