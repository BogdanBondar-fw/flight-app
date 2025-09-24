import { Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import "../../styles/styles.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Header />
      <Container maxWidth="xl" className="layout__container">
        {children}
      </Container>
      <Footer />
    </div>
  );
}
