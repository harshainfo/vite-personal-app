import { Col, Container, Row, Image } from "react-bootstrap";
import profilePhoto from "../../assets/profile-photo.jpg";

export default function Home() {
  return (
    <Container>
      <Row>
        <Col md="3"><p className="fluid">{import.meta.env.VITE_HOME_PARA1}</p>
      <br />
        <p>{import.meta.env.VITE_HOME_PARA2}</p>
        </Col>
        <Col md="3"></Col>

        <Col>
            <Image className="pl-3" src={profilePhoto} alt={import.meta.env.VITE_TITLE} fluid roundedCircle />
        </Col>
      </Row>
    </Container>
  );
}
