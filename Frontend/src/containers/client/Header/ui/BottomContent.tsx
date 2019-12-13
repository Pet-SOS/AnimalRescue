import React from "react";
import {TI18n} from "../../../../i18n";
import "../styles/bottomContent.scss"

export const BottomContent: React.FC = () => {
    return (
        <div className="header-bottom">
           <div className="title">Ты можешь помочь животному в беде</div>
            <div className="content">
                <p className="text">Приют ежедневно заботится о сотнях животных. Самый лучший способ помочь нам и нашим хвостикам - пожертвовать любую сумму на корм, лечение и обеспечение работы приюта.</p>
                <div className="btn-give"><span>Подарить</span></div>
                <div className="block-more">
                    <div ></div>
                </div>
            </div>
        </div>
    )
};