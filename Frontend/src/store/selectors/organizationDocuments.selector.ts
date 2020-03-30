import { ICustomAppState } from "../state";
import { IOrganizationDocumentsState } from "../state/organizationDocuments.state";
import { ORGANIZATION_DOCUMENTS_KEY } from "../reducers/organizationDocuments.reducer";


export const selectVacancies = (state: ICustomAppState): IOrganizationDocumentsState => state[ORGANIZATION_DOCUMENTS_KEY];