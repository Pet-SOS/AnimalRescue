import React from "react";
import { ISocialLinks, IEmails, IAddresses, addInfoContacts } from "../../../../api/contacts";
import { addInfoCard, IDataBankCard } from "../../../../api/infoCard";

interface IPropTypes {
    socialLinks: ISocialLinks;
    phones: string[];
    emails: IEmails;
    addresses: IAddresses;
    infoCard: IDataBankCard;
}
interface IState {
    socialLinks: ISocialLinks;
    phones: {
        [key:string]:string;
    };
    emails: IEmails;
    addresses: IAddresses;
    infoCard:{
        cardNumber:string;
        edrpou: string;
        bankName: string;
        firstName: string;
        lastName: string;
    };
}
export class AdminCommonHead extends React.Component<IPropTypes, IState> {
constructor(props: IPropTypes){
    super(props)
    this.state = {
        socialLinks: {
            instagram: this.props.socialLinks.instagram,
            facebook: this.props.socialLinks.facebook,
            youtube: this.props.socialLinks.youtube
            },
        phones:{
            phone1:this.props.phones[0],
            phone2:this.props.phones[1],
            phone3:this.props.phones[2],
            phone4:this.props.phones[3],
        },
        emails: {
            animalRescue1: this.props.emails.animalRescue1
        },
        addresses:{
            country: this.props.addresses.country,
            town: this.props.addresses.town,
            street: this.props.addresses.street
        },
        infoCard:{
            cardNumber: this.props.infoCard.bankCard.cardNumber,
            edrpou: this.props.infoCard.bankCard.edrpou,
            bankName: this.props.infoCard.bankCard.bankName,
            firstName: this.props.infoCard.bankCard.firstName,
            lastName: this.props.infoCard.bankCard.lastName
        }
    }
}
handleContactInfo = (e:React.ChangeEvent<HTMLInputElement>, key:string) => {
    this.setState({
        phones: {
            ...this.state.phones,
            [key]: e.target.value
        }
    })
}
handleChangeSocialNetworks = (e:React.ChangeEvent<HTMLInputElement>, key:string) => {
    this.setState({
        socialLinks: {
            ...this.state.socialLinks,
            [key]: e.target.value
        }
    })
}
handleEmailInfo = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
        ...this.state,
        emails: {
            animalRescue1: e.target.value
        }
    })
}
handleAddress = (e:React.ChangeEvent<HTMLInputElement>, key:string) => {
    this.setState({
        addresses: {
            ...this.state.addresses,
            [key]: e.target.value
        }
    })
}
handleCard = (e:React.ChangeEvent<HTMLInputElement>, key:string) => {
    this.setState({
        infoCard: {
            ...this.state.infoCard,
            [key]: e.target.value
        }
    })
}

handleSubmit = (e:React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const phonesAll= Object.values(this.state.phones);
    const contacts =  {
        socialLinks: {...this.state.socialLinks},
        phones: [...phonesAll],
        emails:{...this.state.emails},
        addresses: {...this.state.addresses}
    }
    const card = {
        bankCard:{...this.state.infoCard},
        title:'',
        body:''
    }
    addInfoContacts(contacts).then(resp=>console.log(resp));
    addInfoCard(card).then(resp=>console.log(resp));
}

    render(){ 
        return(
            <form onSubmit={(e)=>this.handleSubmit(e)}>
            <h3>Контактна інформація</h3>
            <div>
                <label>Телефон гарячої лінії
                <input onChange={(e)=>this.handleContactInfo(e,'phone1')} type="text"  value={this.state.phones.phone1||''}/>
                </label>
                </div>
            <div>
                <label>Телефон адопції
                <input onChange={(e)=>this.handleContactInfo(e,'phone2')} type="text"  value={this.state.phones.phone2||''} />
                </label>
            </div>
            <div>
                <label>Телефон адопції</label>
                <input
                    onChange={(e)=>this.handleContactInfo(e,'phone3')} type="text" value={this.state.phones.phone3||''} />
            </div>
            <div>
                <label>Телефон адопції</label>
                <input onChange={(e)=>this.handleContactInfo(e,'phone4')} type="text" value={this.state.phones.phone4||''}/>
            </div>
            <div>
                <label>Електрона адреса</label>
                <input onChange={(e)=>this.handleEmailInfo(e)} type="text" value={this.state.emails.animalRescue1||''}/>
            </div>
            <h4>Адреса</h4>
            <div>
                <label>Країна</label>
                <input onChange={(e)=>this.handleAddress(e,'country')} type="text" value={`${this.state.addresses.country}` ||''}/>
            </div>
            <div>
                <label>Місто</label>
                <input onChange={(e)=>this.handleAddress(e,'town')} type="text" value={this.state.addresses.town||''}/>
            </div>
            <div>
                <label>Вулиця</label>
                <input onChange={(e)=>this.handleAddress(e,'street')} type="text" value={this.state.addresses.street||''}/>
            </div>
            <div>
                <h4>Банківська картка</h4>
                <div>
                    <label>Номер картки</label>
                    <input onChange={(e)=>this.handleCard(e,'cardNumber')} type="text" value={this.state.infoCard.cardNumber||''}/>
                </div>
                <div>
                    <label>Iм'я</label>
                    <input onChange={(e)=>this.handleCard(e,'firstName')} type="text" value={`${this.state.infoCard.firstName}`||''}/>
                </div>
                <div>
                    <label>Прізвище</label>
                    <input onChange={(e)=>this.handleCard(e,'lastName')} type="text" value={`${this.state.infoCard.lastName}`||''}/>
                </div>
            </div>
            <h4>Соц.мережі</h4>
            <div>
                <label>Facebook
                <input onChange={(e)=>this.handleChangeSocialNetworks(e,'facebook')}  value={this.state.socialLinks.facebook||''}/>
                </label>
           </div>
            <div>
                <label>Instagram
                <input onChange={(e)=>this.handleChangeSocialNetworks(e,'instagram')}  value={this.state.socialLinks.instagram||''}/>
                </label>
             </div>
            <div>
                <label>Youtube
                <input onChange={(e)=>this.handleChangeSocialNetworks(e,'youtube')}  value={this.state.socialLinks.youtube||''}/>
                </label>
            </div>
            
                <button type="submit" onSubmit={(e)=>this.handleSubmit(e)}>Login</button>
            </form>
        )
    }
}