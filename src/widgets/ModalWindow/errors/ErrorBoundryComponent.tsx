import { FallbackProps} from "react-error-boundary";

export const ErrorBoundryComponent = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;

  return (
    <div>
      <h2>Произошла непредвиденная ошибка</h2>
      <h2>{error.name}</h2>
      <button onClick={resetErrorBoundary}>Перезагрузить страницу</button>
    </div>
  );
};
