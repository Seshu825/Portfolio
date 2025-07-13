import { toast } from 'react-toastify';
import { useState } from 'react';
import { Container } from 'react-bootstrap';

const Exptoas = () => {
  const [firstToastId, setFirstToastId] = useState(null);

  const showFirstToast = () => {
    const id = toast('First Toast');
    setFirstToastId(id);
  };

  const showSecondToast = () => {
    if (firstToastId) {
      toast.dismiss(firstToastId);
    }
    toast('Second Toast');
  };

  return (
    <>
    <Container>
        <div>hjegfehj</div>
    </Container>
    <div>
        <p>lorehvfdhgcvdshjcvsdgcvwehjcbsdc</p>
      <button onClick={showFirstToast}>Show First Toast</button>
      <button onClick={showSecondToast}>Show Second Toast</button>
    </div>
    </>
  );
}

export default Exptoas;