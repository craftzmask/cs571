const Student = ({ student }) => {
    return (
      <div>
        <h2>{student.name.first} {student.name.last}</h2>
        <strong><p>{student.major}</p></strong>
        <p>{student.name.first} is taking {student.numCredits} and is {student.fromWisconsin ? '' : 'not '}from Wisconsin</p>
        <p>They have {student.interests.length} interests including...</p>
        <ul>
          {student.interests.map(i => <li key={i}>{i}</li>)}
        </ul>
      </div>
    );
}

export default Student;