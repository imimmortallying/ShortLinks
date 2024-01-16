import { createContextWithDefaultValue, useSignInQuery } from "shared";
import { UseRefreshData, UseSignInQuerySelectData } from "shared/api/query/query.hooks";

interface IPageContext {
  // user: UseSignInQuerySelectData;
  user: UseRefreshData;
  // user: any;
}

export const { Provider: MainPageProvider, useContext: useMainPageContext } =
createContextWithDefaultValue<IPageContext>({} as IPageContext);
