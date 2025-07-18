import { Col, Container, Row, Image } from "react-bootstrap";
import familyPhoto from "../../assets/family-photo.jpg";

export default function AboutMe() {
    return (
    <Container>
      <Row>
        <Col md="3"><p className="fluid">{import.meta.env.VITE_ABOUTME_PARA1}</p>
      <br />
        <p>{import.meta.env.VITE_ABOUTME_PARA2}</p>
        </Col>
        <Col md="3"></Col>

        <Col>
            <Image className="pl-3" src={familyPhoto} alt="Family photo" fluid roundedCircle />
        </Col>
      </Row>
    </Container>
    );
    }
    