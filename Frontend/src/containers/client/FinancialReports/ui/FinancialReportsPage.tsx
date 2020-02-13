import React from 'react';
import { TI18n } from '../../../../i18n';
import { store } from '../../../../store';
import { HelpBlock } from '../../Header/ui/HelpBlock';
import { IAnimalsListState } from '../../Animals/store/state';
import '../styles/financialReportsPage.scss';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';


interface IPropTypes {
    sickAnimalsList: IAnimalsListState,
    infoCard: IInfoCard,
    infoContacts: IInfoContacts,
    fetchSickAnimals:() => void;
    fetchInfoCard:() => void;
    fetchInfoContacts:() => void;
}
export class FinancialReportsPage extends React.Component<IPropTypes> {

    reports = [
            {
                title:'Финансовый отчет',
                date:'2020'
            },
            {
                title:'Финансовый отчет',
                date:'2019'
            },
            {
                title:'Финансовый отчет',
                date:'2018'
            },
            {
                title:'Финансовый отчет',
                date:'2017'
            },
            {
                title:'Финансовый отчет',
                date:'2016'
            },

        ];
    componentDidMount(){
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
                        this.reports.map((item, i:number)=>
                            <li key={i}>
                                <a className='report' href='/'>
                                    <p className='title-report'>{item.title}</p>
                                    <p className='date-report'>{item.date}</p>
                                </a>
                            </li>
                        )
                    }
                   </ul>
                </div>
            </div>
                {
                    this.props.sickAnimalsList.totalCount > 0 &&
                <HelpBlock
                    animalsList={this.props.sickAnimalsList}
                    backgroundColor='#333572'
                    title={<TI18n keyStr="canHelpBlockTitle" default="Кому ты можешь помочь" />}
                    color='#409275'
                    text={{
                    color: '#ffffff',
                    content: <TI18n keyStr="canHelpBlockContent" default="Маша скромная и добрая собачка. Очень терпеливая и ненавязчивая. Маша была сбита машиной, пережила стресс. Сначала была испугана, потом успокоилась и начала доверять людям. Для восстановления после аварии нужно собрать 3 500 грн." />
                    }}
                    btn={{
                    style: 'yellow',
                    content: <TI18n keyStr="footerRightBtn" default="Помочь" />
                    }}
                    story={true}
                />
                }
        </React.Fragment>
        )
    }
};