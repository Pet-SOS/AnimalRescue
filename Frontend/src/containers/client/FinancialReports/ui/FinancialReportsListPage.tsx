import React from 'react';
import { TI18n } from '../../../../i18n';
import { store } from '../../../../store';
import { HelpBlock } from '../../../../components/HelpBlock';
import { IAnimalsListState } from '../../Animals/store/state';
import '../styles/financialReportsPage.scss';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';
import { IFinancialReport, IInfoFile, fetchFinancialReporDocument } from '../../../../api/financialReport';
import { ReactComponent as Pdf } from '../../../../img/pdf.svg';


interface IPropTypes {
    match: any;
    sickAnimalsList: IAnimalsListState;
    infoCard: IInfoCard;
    infoContacts: IInfoContacts;
    financeReports: IFinancialReport[];
    fetchSickAnimals:() => void;
    fetchInfoCard:() => void;
    fetchInfoContacts:() => void;
    fetchFinancialReport:()=> void;
}
interface IState{
    reports: string[];
    pdfReport: {
        file: string;
        url: string;
    }
}
export class FinancialReportsListPage extends React.Component<IPropTypes, IState> {
    year = this.props.match.params.year;
    reports: IInfoFile[] = [];

    constructor(props: IPropTypes) {
        super(props);
        this.state= {
            reports:[],
            pdfReport: {
                file:'',
                url: ''
            }
        }
    }

    componentDidMount(){
        if(store.getState().animals.sickAnimalsList.totalCount === 0){
            this.props.fetchSickAnimals();
            this.props.fetchInfoCard();
            this.props.fetchInfoContacts()
            this.props.fetchFinancialReport();
        }
    }

    getFinanceReportsForYear(){
        this.props.financeReports.map((iter: IFinancialReport)=>{
            if(iter.date == this.year){
                this.reports=[...iter.reports];
            }
        })
    }

    openPdfFile(item: IInfoFile){
        fetchFinancialReporDocument(item.fileId)
        .then((resp)=>{
            const file = new Blob(
                [resp.data],
                {type: 'application/pdf'});
            const fileURL =URL.createObjectURL(file);    

           const strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
            window.open(fileURL,'pdf-report', strWindowFeatures);
         })
        .catch(error => {
            console.log(error);
          });
    }

    render(){
        this.getFinanceReportsForYear();
        return (
        <React.Fragment>
            <div className='financial-report-block'>
                <div className="content">
                    <div className="title"> <TI18n keyStr="financialReportsPageTitle" default="Финансовые отчеты"/></div>
                    <div className="text-report"> <TI18n keyStr="financialReportsPageText" default="Каждый месяц до 20 числа мы готовим финансовый отчет, в котором указываем все суммы, пришедшие от доброжелателей и как они были распределены"/></div>
                    <ul className='reports'>
                    {
                        this.reports.map((item, i:number)=>
                            <li key={i} onClick={()=>{this.openPdfFile(item)}}>
                                <Pdf className='pdf-icon' />{item.title}
                            </li>)
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