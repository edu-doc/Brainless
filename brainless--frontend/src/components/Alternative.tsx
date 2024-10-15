import { cn } from "../utils";

type Props = {
  alternativaSelecionada: string;
  label: string;
  submitted: boolean;
  onClick: () => void;
  text: string;
  resposta: string;
};

const Alternative = (props: Props) => {
  return (
    <button
      type="button"
      disabled={props.submitted}
      onClick={props.onClick}
      className={cn(
        `flex items-center transition-colors p-6 shadow-md rounded-xl text-center text-black text-xl font-semibold`,
        props.submitted
          ? props.label === props.resposta
            ? "bg-green-400"
            : props.label === props.alternativaSelecionada && "bg-red-400"
          : props.alternativaSelecionada === props.label && "bg-sky-100"
      )}
    >
      <div className="flex items-center justify-center bg-slate-600 text-white size-8  rounded-full mr-4">
        <p className="mb-1">{props.label}</p>
      </div>
      <p>{props.text}</p>
    </button>
  );
};

export default Alternative;
