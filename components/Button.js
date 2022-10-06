import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';

export default function Buttons() {
  const button = useSelector((state) => state.button);

  return (
    <>
      {button.load === false ? (
        <Button type="submit" id="myBtn" block outline color={button.color}>
          {button.text}
        </Button>
      ) : (
        <Button type="submit" id="myBtn" block color={button.color} disabled>
          {button.text}
        </Button>
      )}
    </>
  );
}
