import ScreeningModule from "./PHQ9Module";

export default function App() {
  return <ScreeningModule onNavigate={(to) => {
    if (to === "resources") window.location.href = "/resources";
    if (to === "booking") window.location.href = "/booking";
  }} />;
}
