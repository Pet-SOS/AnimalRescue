
import React, { ChangeEvent } from 'react';
import { Tabs } from 'antd';
import'../style/FinancialReportsPage.scss';
import { IFinancialReport, deleteFinancialReporDocument, addFinancialReporDocument } from '../../../../api/financialReport';
import { ReactComponent as Pdf } from '../../../../img/pdf.svg';
import moment, { Moment } from 'moment';
import { TI18n } from '../../../../i18n';
import { Button, ButtonTypes } from '../../../../components/Button';
import { DatePicker } from 'antd';

const { TabPane } = Tabs;
interface IState{
    [key:string]:any;
    // [title:string]:string;
    // [body:string]:string;
    // [date:Date| string
}
interface IPropTypes{
  financeReports:IFinancialReport[];
  fetchFinancialReport:()=>{};
};
export class FinancialReportsPage extends React.Component <IPropTypes, IState>{

  constructor(props:any) {
    super(props);
    this.state= {
      file: '',
      title:'',
      body:'',
      date:'',
    };
  }
  componentDidMount(){
    this.props.fetchFinancialReport()
  }

  handleSubmit(e: any) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state);
    addFinancialReporDocument(this.state).then(resp=>{
      console.log(resp);
    });
  }

  uploadFile(e: any) {
    e.preventDefault();
    // const reader = new FileReader();
    // reader.onload = (e:any) => {

    //   const arrayBuffer = e.target.result;
    //   const array = new Uint8Array(arrayBuffer);
    //   console.log(array);
    //   console.log(e);
    //   console.log(new Int8Array(e.target.result));
  
    // }
    // ;
    // const file = reader.readAsArrayBuffer(e.target.files[0])
    const formData = new FormData();
    formData.append('report', e.target.files[0]);
    this.setState({file: formData });
  }

  handleFileInfo(field:string, e:any){
    switch(field){
      case'title':
      case'body':
        this.setState({[field]: e.target.value });
        break;
      case'date':
        this.setState({[field]: e.toDate() });
        break;
    }
  }

  deleteReport(id:string, title:string): void {
    console.log(title);
    deleteFinancialReporDocument(id).then(resp=>{
      console.log(resp);
      if(resp.status === 200){
        this.props.fetchFinancialReport();
      }
    })
  }

  render() {
    return (
      <div className='main-report'>
          <div className='title'> Завантажити новий звiт</div>
          <form onSubmit={(e)=>this.handleSubmit(e)}>
              <div  className='field'>
                <label>Додати файл:</label><br></br>
                <input 
                  className="custom-file-input" 
                  type="file"
                  onChange={(e)=>this.uploadFile(e)} />
              </div>
              <div  className='field'>
              <label>Додати ім'я:</label><br></br>
                <input className="fileInput" 
                  type="text"
                  placeholder=''
                  onChange={(e)=>this.handleFileInfo('title', e)} />
              </div>
              <div  className='field'>
              <label>Додати опис:</label><br></br>
                <input className="fileInput" 
                  type="text"
                  placeholder=''
                  onChange={(e)=>this.handleFileInfo('body', e)} />
              </div>
              <div  className='field'>
              <label>Додати дату:</label><br></br>
                <DatePicker
                  placeholder=''
                  onChange={(e)=>this.handleFileInfo('date', e)} 
                />
              </div>
            </form>
            <Button
              onClick={(e)=>this.handleSubmit(e)}
              styleType={ButtonTypes.Blue}>
              <TI18n keyStr="addReport"  />
            </Button>
            <div className='title'>Список звітів за всi роки</div>
            {this.props.financeReports.length > 0 &&
              <div>
                <Tabs defaultActiveKey="1" tabPosition='top'>
                  {this.props.financeReports.map((report:IFinancialReport, i:number)=> (
                    <TabPane tab={report.date} key={report.date+1} >
                    <div>
                    { report.reports.map((list) => (
                      <p key={list.fileId} className='report' >
                      <Pdf className='pdf-icon' /><TI18n keyStr={`dateText${moment(list.date).month()}`}/> <span className='year-report'>{moment(list.date).year()}</span>
                      <span onClick={()=>{this.deleteReport(list.fileId, list.title)}} className='delete'></span>
                      </p>
                    ))}
                      </div>
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            }
          </div>
    );
  }
}