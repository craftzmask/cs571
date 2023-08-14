import Song from "./Song";
import { Row, Col } from 'react-bootstrap';

const SongDisplay = ({ songs }) => (
  <Row>
    {
      songs.map(song => (
        <Col xs={12} sm={6} md={4} lg={3} xl={2} key={song.id}>
          <Song {...song} />
        </Col>
      ))
    }
  </Row>
)

export default SongDisplay;