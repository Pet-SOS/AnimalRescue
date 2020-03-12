import React from 'react';
import { TI18n } from '../../../../i18n';
import { store } from '../../../../store';
import { HelpBlock } from '../../../../components/HelpBlock';
import { IAnimalsListState } from '../../Animals/store/state';
import '../styles/financialReportsPage.scss';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';
import { IFinancialReport } from '../../../../api/financialReport';
import { NavLink } from 'react-router-dom';


interface IPropTypes {
    sickAnimalsList: IAnimalsListState;
    infoCard: IInfoCard;
    infoContacts: IInfoContacts;
    financeReports: IFinancialReport[];
    fetchSickAnimals:() => void;
    fetchInfoCard:() => void;
    fetchInfoContacts:() => void;
    fetchFinancialReport:()=> void;
}
export class FinancialReportsPage extends React.Component<IPropTypes> {
    componentDidMount(){
        this.props.fetchFinancialReport();
        if(store.getState().animals.sickAnimalsList.totalCount === 0){
            this.props.fetchSickAnimals();
            this.props.fetchInfoCard();
            this.props.fetchInfoContacts()
        }
    }
    render(){
        return (
        <React.Fragment>
            <div className='financial-report-block'>
                <div className="content">
                    <div className="title"> <TI18n keyStr="financialReportsPageTitle" default="Финансовые отчеты"/></div>
                    <div className="text-report"> <TI18n keyStr="financialReportsPageText" default="Каждый месяц до 20 числа мы готовим финансовый отчет, в котором указываем все суммы, пришедшие от доброжелателей и как они были распределены"/></div>
                    <ul className='box-reports'>
                    {
                        this.props.financeReports.map((item, i:number)=>
                            <li key={i}>
                                <NavLink to={`/about/financial-reports/${item.date}`} className='report' href={`/${item.date}`}>
                                    <p className='title-report'>{ <TI18n keyStr="financialReportsPageTitle"/>}</p>
                                    <p className='date-report'>{item.date}</p>
                                </NavLink>
                            </li>
                        )
                    }
                   </ul>
                </div>
            </div>
                {
                    this.props.sickAnimalsList.totalCount > 0 &&
                <HelpBlock
                    animalsList={this.props.sickAnimalsList.data}
                    title={<TI18n keyStr="canHelpBlockTitle" default="Кому ты можешь помочь" />}
                    text={<TI18n keyStr="canHelpBlockContent" default="Маша скромная и добрая собачка. Очень терпеливая и ненавязчивая. Маша была сбита машиной, пережила стресс. Сначала была испугана, потом успокоилась и начала доверять людям. Для восстановления после аварии нужно собрать 3 500 грн." />}
                    buttonText={<TI18n keyStr="footerRightBtn" default="Помочь" />}
                />
                }
        </React.Fragment>
        )
    }
};