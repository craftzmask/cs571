import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Student from './Student';

const Classroom = () => {
  const [students, setStudents] = useState([]);
  const [shownStudents, setShownStudents] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchMajor, setSearchMajor] = useState('');
  const [searchInterest, setSearchInterest] = useState('');

  useEffect(() => {
    axios
      .get('https://cs571.org/s23/hw4/api/students', {
        headers: {
          "X-CS571-ID": "bid_2b48c7a36a98db55355d"
        }
      })
      .then(response => response.data)
      .then(students => {
        setStudents(students);
        setShownStudents(students);
      });
  }, []);

  useEffect(() => {
    const filteredStudents = students.filter(stud => {
      const { name, major, interests } = stud;
      const studentFullName = `${name.first} ${name.last}`.toLocaleLowerCase();

      return studentFullName.includes(searchName.trim().toLocaleLowerCase()) &&
        major.toLowerCase().includes(searchMajor.trim().toLocaleLowerCase()) &&
        interests.some(i => i.toLowerCase().includes(searchInterest.trim().toLocaleLowerCase()));
      });

    setShownStudents(filteredStudents);
  }, [searchName, searchMajor, searchInterest]);

  return <div>
    <Form>
      <Form.Label htmlFor="searchName">Name</Form.Label>
      <Form.Control
        id="searchName"
        value={searchName}
        onChange={e => setSearchName(e.target.value)}
      />
      <Form.Label htmlFor="searchMajor">Major</Form.Label>
      <Form.Control
        id="searchMajor"
        value={searchMajor}
        onChange={e => setSearchMajor(e.target.value)}  
      />
      <Form.Label htmlFor="searchInterest">Interest</Form.Label>
      <Form.Control
        id="searchInterest"
        value={searchInterest}
        onChange={e => setSearchInterest(e.target.value)}  
      />
      <br />  
      <Button
        variant="neutral"
        onClick={() => {
          setSearchName('');
          setSearchMajor('');
          setSearchInterest('');
        }
      }>
        Reset Search
      </Button>
    </Form>
    <Container fluid>
      <Row>
        {shownStudents.map(student => {
          return (
            <Col key={student.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Student student={student} />
            </Col>
          );
        })}
      </Row>
    </Container>
  </div>
}

export default Classroom;