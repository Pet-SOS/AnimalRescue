import React from "react";
import {AdminMenuWrapper} from "../../AdminMenu";
import {Tabs} from "antd";
import '../style/locations.scss';
import {ClinicList} from "./ClinicList";
import {ShelterList} from "./ShelterList";
import {OverdueList} from "./OverdueList";
import {IRequestParams} from "../../../../api/requestOptions";
import {LocationsCode} from "../../../../api/admin";

const {TabPane} = Tabs;

interface ILocationTabsProps {

}


export class LocationTabs extends React.Component<ILocationTabsProps> {

    componentDidMount(): void {

    }

    render() {
        return (
            <AdminMenuWrapper selectedKey="locations" openKeys={[]}>
                <header><h3> Локація </h3></header>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Перетримка" key="1">
                        <OverdueList/>
                    </TabPane>
                    <TabPane tab="Приют" key="2">
                        <ShelterList/>
                    </TabPane>
                    <TabPane tab="Клініка" key="3">
                        <ClinicList/>
                    </TabPane>
                </Tabs>
            </AdminMenuWrapper>
        );
    }

}
