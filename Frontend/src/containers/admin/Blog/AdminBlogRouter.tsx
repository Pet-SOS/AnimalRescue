import {Switch, useRouteMatch} from "react-router";
import React from "react";
import {guardLogin} from "../guards/guardLogin";
import {GuardedRoute, GuardProvider} from "react-router-guards";
import {BlogListPage} from "./ui/BlogListPage";


export const AdminBlogRouter: React.FC = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <GuardProvider guards={[guardLogin]}>
                <GuardedRoute path={match.path} exact>
                    <BlogListPage/>
                </GuardedRoute>
            </GuardProvider>
        </Switch>
    );
};
