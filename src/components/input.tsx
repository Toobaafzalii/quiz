export const FormInput: React.FC<IInputProps> = (props) => {
  return (
    <div className="w-full inline-flex justify-between items-center gap-2">
      <p className="text-gray-300 text-lg font-bold text-nowrap">
        {props.lable} :
      </p>
      <input
        className="w-full bg-gray-300 rounded-xl text-gray-700 text-lg font-semibold py-2.5 px-3"
        type={props.type}
        placeholder={`Inter ${props.lable}`}
        required={true}
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};
