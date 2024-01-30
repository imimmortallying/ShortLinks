

import {FallbackProps} from "react-error-boundary"

export const ErrorBoundryComponent = (props: FallbackProps) => {
    const {error, resetErrorBoundary} = props
    return (
        <div>
            reset
        </div>
    );
};