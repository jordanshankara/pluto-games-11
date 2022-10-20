import FaHandRock from "../../public/assets/batu.png";
import FaHandPaper from "../../public/assets/kertas.png";
import FaHandScissors from "../../public/assets/gunting.png";

export function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  };
  const Icon = icons[action];
  return (
    <img
      src={action == undefined ? "" : Icon.src}
      {...props}
      alt="Choice"
      id="rpsIcon"
    />
  );
}
