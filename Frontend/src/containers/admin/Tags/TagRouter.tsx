import {Switch, useRouteMatch, withRouter} from "react-router";
import {GuardedRoute, GuardProvider} from "react-router-guards";
import TagsCategoryList from "./TagsCategory/TagsCategoryList";
import TagsList from "./TagsList/TagsList";
import React from "react";
import {guardLogin} from "../guards/guardLogin";

const AdminTag: React.FC = () => {
    let match = useRouteMatch();
    return (
        <Switch>
            <GuardProvider guards={[guardLogin]}>
                <GuardedRoute path={`${match.path}`} exact>
                    <TagsCategoryList/>
                </GuardedRoute>
                <GuardedRoute path={`${match.path}/:tagCategoryName`} exact>
                    <TagsList/>
                </GuardedRoute>
            </GuardProvider>
        </Switch>
    )
};


export const AdminTagRouter = withRouter(AdminTag);
