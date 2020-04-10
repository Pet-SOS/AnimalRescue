import React from 'react';
import { TI18n } from '../../../../i18n';
import { store } from '../../../../store';
import { HelpBlock } from '../../../../components/HelpBlock';
import { IAnimalsListState } from '../../Animals/store/state';
import '../styles/financialReportsPage.scss';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';
import { IFinancialReport } from '../../../../api/financialReport';
import { NavLink } from 'react-router-dom';
import { IBreadcrumbProps } from '../../../../components/Breadcrumbs/item';
import { Breadcrumbs } from '../../../../components/Breadcrumbs';


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
  private breadCrumbs: IBreadcrumbProps[] = [
    {
      text: <TI18n keyStr='breadcrumbAbout' default='Дізнатися більше про службу порятунку' />,
      href: '/about'
    },
    {
      text: <TI18n keyStr='breadcrumbRules' default='Дізнатися про правила взаємодії зі службою' />,
      href: '/about/rules'
    }
  ];
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
            <div className='financial-report-block section-margin'>
                <div className="container">
                    <h2> <TI18n keyStr="financialReportsPageTitle" default="Финансовые отчеты"/></h2>
                    <div className="page-description">
                        <p><TI18n keyStr="financialReportsPageText" default="Каждый месяц до 20 числа мы готовим финансовый отчет, в котором указываем все суммы, пришедшие от доброжелателей и как они были распределены"/></p>
                    </div>
                    <ul className='box-reports section-padding'>
                    {
                        this.props.financeReports.map((item, i:number)=>
                            <li key={i}>
                                <NavLink to={`/about/financial-reports/${item.date}`} className='report' href={`/${item.date}`}>
                                    <span className='title-report'>{ <TI18n keyStr="financialReportsPageTitle"/>}</span>
                                    <strong className='date-report'>{item.date}</strong>
                                </NavLink>
                            </li>
                        )
                    }
                   </ul>
                <Breadcrumbs data={this.breadCrumbs} />
                </div>
            </div>
                {
                    this.props.sickAnimalsList.totalCount > 0 &&
                <HelpBlock
                    animalsList={this.props.sickAnimalsList.data}
                    title={<TI18n keyStr="canHelpBlockTitle" default="Кому ты можешь помочь" />}
                />
                }
        </React.Fragment>
        )
    }
};