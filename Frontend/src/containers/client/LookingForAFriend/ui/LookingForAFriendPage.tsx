import React from 'react';
import { TI18n } from '../../../../i18n';
import i18n from 'i18n-js';
import '../style/lookingForAFriendPage.scss';
import { IAnimalsListState } from '../../Animals/store/state';
import { IInfoCard, IInfoContacts } from '../../Home/store/state';
import { Select, SelectExpandDirections } from '../../../../components/Select';
import { AnimalGender, AnimalBreed, AnimalFilterKind, AnimalSize, AnimalAge, Tags } from '../../../../api/animals';
import tranlateText from '../../../../i18n/translations/ru';
import { store } from '../../../../store';
import { HelpBlock } from '../../Header/ui/HelpBlock';
import { AnimalCard } from '../../Animals/AnimalCard';
import { BtnPagination } from '../../Blog/ui/BtnPagination';
import { IRequestParams } from '../../../../api/requestOptions';
import defaultText from '../../../../i18n/translations/ru';
import { CheckBoks } from '../../../../components/CheckBoks';

interface Enum {
    [id: string]: string
}
interface IPropTypes {
    match: any,
    history: any,
    location:any,
    sickAnimalsList: IAnimalsListState,
    infoCard: IInfoCard,
    infoContacts: IInfoContacts,
    animalsList: IAnimalsListState,
    fetchSickAnimals:() => void;
    fetchAnimalsRequest:(params?: IRequestParams) => void;
    fetchInfoCard:() => void;
    fetchInfoContacts:() => void;
}
interface ISelect {
    value:string;
    key?:string;
    check?: boolean;
}
interface ITagsCheckbox {
    [name: string]:ISelect;
}
interface IState {
    [name: string]: ISelect;
}
export class LookingForAFriendPage extends React.Component<IPropTypes> {
    public state: any; 
    public toPage: number = 1;
    public sizeAnimalToPage:number = 15;
    public allFilterRequestString: string ='';
    public tagsAll='tags~all~';
    public initialState: any;
    public filterUrl:any;


    constructor(props:IPropTypes) {
        super(props);
        this.state = {
            kindOfAnimal:{
                value: Object.values(AnimalFilterKind)[0],
                key:Object.keys(AnimalFilterKind)[0],
            },
            breed:{
                value:Object.values(AnimalBreed)[0],
                key:Object.keys(AnimalBreed)[0],
            },
            gender:{
                value:Object.values(AnimalGender)[0],
                key:Object.keys(AnimalGender)[0],
            },
            age:{
                value:Object.values(AnimalAge)[0],
                key:Object.keys(AnimalAge)[0],
            },
            size:{
                value:Object.values(AnimalSize)[0],
                key:Object.keys(AnimalSize)[0],
            },
            STERILIZED: {
                value:Tags.STERILIZED,
                key:'STERILIZED',
                check: false
            },
            VACCINATED: {
                value:Tags.VACCINATED,
                key: 'VACCINATED',
                check: false
            },
            SPECIAL: {
                value:Tags.SPECIAL,
                key:'SPECIAL',
                check: false
            },
            READYTOTRAVEL: {
                value:Tags.READYTOTRAVEL,
                key:'READYTOTRAVEL',
                check: false
            },
            THELOSS:{
                value:Tags.THELOSS,
                key:'THELOSS',
                check: false
            }
        };
        this.initialState = this.state;
    }

    getCindOfAnimal(type: string): any{
       switch (type) {
            case 'kindOfAnimal':return AnimalFilterKind;
            case 'breed' :return AnimalBreed;
            case 'gender':return AnimalGender;
            case 'age':return AnimalAge;
            case 'size':return AnimalSize;
        }
    }

    getAllQueryParamsToState(str: string){
        let paramsArr = str.slice(0, str.length-1).replace('?','').split('/');
        paramsArr.forEach(param =>{
            const arrKeys = param.split('=');
            const keyStr = arrKeys[0];
            const value = arrKeys[1];
            if((keyStr === 'STERILIZED'|| keyStr === 'VACCINATED'|| keyStr === 'SPECIAL'|| keyStr === 'READYTOTRAVEL' || keyStr ==='THELOSS')){
                this.setState({ [keyStr]:{
                     ...this.state[keyStr],
                    check:  (/true/i).test(value)
                }},()=> this.sendFilterRequest())
            }else{
                this.setState({ [keyStr]:{
                    ...this.state[keyStr],
                    key: value,
                    value: this.getCindOfAnimal(keyStr)[value]
                }}, ()=> this.sendFilterRequest())
            }
        })
    }

    componentDidMount(){
        if(this.props.location.search){
            this.getAllQueryParamsToState(this.props.location.search);
        }
        if(store.getState().animals.sickAnimalsList.totalCount === 0){
            this.props.fetchAnimalsRequest({
                page: +this.props.match.params.page,
                size: this.sizeAnimalToPage,
            })
            this.props.fetchInfoCard();
            this.props.fetchInfoContacts();
            this.props.fetchSickAnimals();
        }
    }

    convertToRoutingParams(){
        let strParams = '';
        for(let key in this.state){
            if(this.state[key].key !== 'ANY'){
                if(key ==='age'){
                    continue;
                } else if((key === 'STERILIZED'|| key === 'VACCINATED'|| key === 'SPECIAL'|| key === 'READYTOTRAVEL'|| key==='THELOSS') ){
                    strParams= this.state[key].check ? `${strParams}${key}=${this.state[key].check}/`: strParams;
                    continue;
                }
                else{
                    strParams= `${strParams}${key}=${this.state[key].key}/`;
                }
            }
        }
        return strParams;
    }

    sendFilterRequest(){
        let strTags=''
        let filterParams =''
        this.toPage=1;
        for(let key in this.state){
            if(this.state[key].key !== 'ANY'){
                if(key ==='age'){
                    continue;
                }
                if(key === 'size' || key === 'breed'){
                    strTags= `${strTags}'${this.state[key].key}'`;
                }else if(key === 'STERILIZED'|| key === 'VACCINATED'||key === 'SPECIAL'|| key === 'READYTOTRAVEL'|| key ==='THELOSS'){
                    strTags = (!!this.state[key].check)? `${strTags}'${this.state[key].key}'`: strTags;
                }
                else{
                    let partFilter = `${key}~eq~'${this.state[key].key}'`;
                    filterParams= (filterParams ==='') ? `${filterParams}${partFilter}` : `${filterParams};${partFilter}`;
                }
            }
        }
        let tags =`${this.tagsAll}${strTags}`;
        
        if(strTags!=='' && filterParams !== ''){
            this.allFilterRequestString = `${tags};${filterParams}`;
        } else if(filterParams === '' && strTags==='' ){
            this.allFilterRequestString = '';
        }
        else if(filterParams === ''){
            this.allFilterRequestString = tags;
        }else {
            this.allFilterRequestString =filterParams;
        }

        this.props.fetchAnimalsRequest({
            page:+this.props.match.params.page,
            size: this.sizeAnimalToPage,
            filter: this.allFilterRequestString,
        })
        this.props.history.push({
            pathname: `/animals/page/${+this.props.match.params.page}`,
            search: this.convertToRoutingParams(),
            state: this.state
        })

    }

    setLocale(value:string, objLocale:{[key: string]: string}, type:string){
        const keyObj = Object.keys(objLocale)[Object.values(objLocale).indexOf(value)]
         this.props.history.push({
            pathname: `/animals/page/1`,
            search: this.convertToRoutingParams(),
            state: this.state
        })
        this.setState ({ [type]:{
            ...this.state[type],
            value:value,
            key:keyObj
        }} ,()=>{ this.sendFilterRequest()})
    }

    setCheckboxCheck(name:string){
        this.setState({ [name]:{
            ...this.state[name],
            check:!this.state[name].check
        }},()=>{this.sendFilterRequest()})
    }
  
    goToPagination(toPage:string| number){
       this.toPage =+toPage;
       this.props.fetchAnimalsRequest({
            page: this.toPage,
            size: this.sizeAnimalToPage,
            filter: this.allFilterRequestString,
        })
        this.props.history.push({
            pathname: `/animals/page/${this.toPage}`,
            search: this.convertToRoutingParams(),
            state: this.state
        })
    }

    clearFilter(){
        this.props.history.push({
            pathname: `/animals/page/1`,
        })
        this.setState (this.initialState ,()=>{ this.sendFilterRequest()})
    }

    render(){
        return (
            <div className='looking-friend-block'>
                <div className='content'>
                    <div className='title'><TI18n keyStr="lookingForAFriendPageTitle" default={defaultText.lookingForAFriendPageTitle}/></div>
                    <div className='box-select'>
                        <Select
                            data={Object.values(AnimalFilterKind).map((value:string)=>({label: i18n.t('AnimalFilterKind'+value), value: value}))}
                            selected={this.state.kindOfAnimal.value}
                            onChange={(value: string) => this.setLocale(value,AnimalFilterKind, 'kindOfAnimal' )}
                            expandDirection={SelectExpandDirections.BOTTOM}
                            title={<TI18n keyStr="lookingForAFriendPageSelectKind" default={tranlateText.lookingForAFriendPageSelectKind} />}
                        />
                        <Select
                            data={Object.values(AnimalBreed).map((value)=>({label: i18n.t('AnimalBreed'+value), value: value}))}
                            selected={this.state.breed.value}
                            onChange={(value: string) => this.setLocale(value,AnimalBreed,'breed')}
                            expandDirection={SelectExpandDirections.BOTTOM}
                            title={<TI18n keyStr="lookingForAFriendPageSelectBreed" default={tranlateText.lookingForAFriendPageSelectBreed} />}
                        />
                        <Select
                            data={Object.values(AnimalGender).map((value)=>({label: i18n.t('AnimalGender'+value), value: value}))}
                            selected={this.state.gender.value}
                            onChange={(value: string) => this.setLocale(value,AnimalGender, 'gender')}
                            expandDirection={SelectExpandDirections.BOTTOM}
                            title={<TI18n keyStr="lookingForAFriendPageSelectGender" default={tranlateText.lookingForAFriendPageSelectGender} />}
                        />
                        <Select
                            data={Object.values(AnimalAge).map((value)=>({label: i18n.t('AnimalAge'+value), value: value}))}
                            selected={this.state.age.value}
                            onChange={(value: string) => this.setLocale(value, AnimalAge, 'age')}
                            expandDirection={SelectExpandDirections.BOTTOM}
                            title={<TI18n keyStr="lookingForAFriendPageSelectAge" default={tranlateText.lookingForAFriendPageSelectAge} />}
                        />
                         <Select
                            data={Object.values(AnimalSize).map((value)=>({label: i18n.t('AnimalSize'+value), value: value}))}
                            selected={this.state.size.value}
                            onChange={(value: string) => this.setLocale(value, AnimalSize,'size')}
                            expandDirection={SelectExpandDirections.BOTTOM}
                            title={<TI18n keyStr="lookingForAFriendPageSelectSize" default={tranlateText.lookingForAFriendPageSelectSize} />}
                        />
                    </div>
                    <div className='second-filter'>
                        <div className='box-checkBoks'>
                            <CheckBoks
                                name={<TI18n keyStr='sterilized'/>}
                                setCheckboxCheck={this.setCheckboxCheck.bind(this)}
                                state={this.state.STERILIZED.check}
                                tag={this.state.STERILIZED.key}
                            />
                            <CheckBoks
                                name={<TI18n keyStr='vaccinated'/>}
                                setCheckboxCheck={this.setCheckboxCheck.bind(this)}
                                state={this.state.VACCINATED.check}
                                tag={this.state.VACCINATED.key}
                            />
                            <CheckBoks
                                name={<TI18n keyStr='special'/>}
                                setCheckboxCheck={this.setCheckboxCheck.bind(this)}
                                state={this.state.SPECIAL.check}
                                tag={this.state.SPECIAL.key}
                            />
                            <CheckBoks
                                name={<TI18n keyStr='readytoabroad'/>}
                                setCheckboxCheck={this.setCheckboxCheck.bind(this)}
                                state={this.state.READYTOTRAVEL.check}
                                tag={this.state.READYTOTRAVEL.key}
                            />
                            <CheckBoks
                                name={<TI18n keyStr='theLoss'/>}
                                setCheckboxCheck={this.setCheckboxCheck.bind(this)}
                                state={this.state.THELOSS.check}
                                tag={this.state.THELOSS.key}
                            />
                        </div>
                        <button className='clear-filter' onClick={()=>this.clearFilter()}>
                           <TI18n keyStr="lookingForAFriendPageClearFilter" default={defaultText.lookingForAFriendPageClearFilter} />
                        </button>
                    </div>
                    <div className='box-all-animals'>
                        <TI18n keyStr="countAnimalsFirstPart" default={defaultText.countAnimalsFirstPart} />
                        <span>{this.props.animalsList.totalCount}</span>
                        <TI18n keyStr="countAnimalsSecondPart" default={defaultText.countAnimalsSecondPart} />
                    </div>
                    <div className='content-block'>
                        {
                            this.props.animalsList.data.length &&
                            this.props.animalsList.data.map(animal => <div className='animal' key={animal.id}><AnimalCard animal={animal}/></div>)
                        }
                    </div>
                    <BtnPagination
                    setProps={this.props}
                    pageCount={this.props.animalsList.pageCount}
                    goToPagination={this.goToPagination.bind(this)}
                />
                </div>
                <HelpBlock
                    animalsList={this.props.sickAnimalsList}
                    backgroundColor='#333572'
                    title={<TI18n keyStr="canHelpBlockTitle" default={defaultText.canHelpBlockTitle} />}
                    color='#409275'
                    text={{
                    color: '#ffffff',
                    content: <TI18n keyStr="canHelpBlockContent" default={defaultText.canHelpBlockContent} />
                    }}
                    btn={{
                    style: 'yellow',
                    content: <TI18n keyStr="footerRightBtn" default={defaultText.footerRightBtn} />
                    }}
                    story={true}
                />
            </div>
        )
    }
}