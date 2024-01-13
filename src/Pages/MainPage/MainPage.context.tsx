import { createContextWithDefaultValue, useSignInQuery } from "shared";
import { UseSignInQuerySelectData } from "shared/api/query/query.hooks";

interface IPageContext {
  user: UseSignInQuerySelectData;
}

export const { Provider: MainPageProvider, useContext: useMainPageContext } =
createContextWithDefaultValue<IPageContext>({} as IPageContext);
