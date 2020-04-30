import React from "react";
import {AdminMenuWrapper} from "../../AdminMenu";
import {Tabs} from "antd";
import {Button, ButtonTypes} from "../../../../components/Button";
import '../style/locations.scss';

const {TabPane} = Tabs;


export class LocationTabs extends React.Component {

    handleAddAnimalClick = () => {
        window.console.log("Add location clicked")
    };

    render() {
        return (
            <AdminMenuWrapper selectedKey="locations" openKeys={[]}>
                <header><h3> Локація </h3></header>
                <div className="locations-header">
                    <Button
                        className="add-location-btn"
                        onClick={this.handleAddAnimalClick}
                        styleType={ButtonTypes.BlueOutlineSmall}>
                        Додати нову локацію
                    </Button>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Перетримка" key="1">
                    </TabPane>
                    <TabPane tab="Приют" key="2">
                    </TabPane>
                    <TabPane tab="Клініка" key="3">
                    </TabPane>
                </Tabs>
            </AdminMenuWrapper>
        );
    }

}
