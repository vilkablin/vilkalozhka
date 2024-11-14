import Card from "../components/Card/Card";
import Container from "../components/Сontainer/Сontainer";

const FavouritesPage = () => {
  const style = {
    padding: "60px 24px 0px 24px",
  }
  return (
    <Container>
      <h2 style={style}>Избранное</h2>

      <div className="cards">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </Container>
  );
};

export default FavouritesPage;