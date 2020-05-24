import React from "react";
import { ISocialLinks, IEmails, IAddresses, addInfoContacts } from "../../../../api/contacts";
import { addInfoCard, IDataBankCard } from "../../../../api/infoCard";
import { HtmlEditor } from "../../../../components/HtmlEditor";
import _ from "lodash";

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
        body:string;
    };
    editorCardState: string;
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
            body: this.props.infoCard.body,
        },
        editorCardState: this.props.infoCard.body,
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

componentDidUpdate(prevProps: IPropTypes ) {
    const { infoCard } = this.props;
    if(!_.isEqual(infoCard, prevProps.infoCard)){
      this.setState({
        editorCardState: infoCard.body
      });
    }
  }

  onEditorStateChange = (editorCardState: string) => {
    this.setState({
      editorCardState
    });
  };

handleSubmit = (e:React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const phonesAll= Object.values(this.state.phones);
    const contacts =  {
        socialLinks: {...this.state.socialLinks},
        phones: [...phonesAll],
        emails:{...this.state.emails},
        addresses: {...this.state.addresses}
    }
    const card = {...this.state.infoCard}
    // const htmlCard = draftToHtmlHelper();
    card.body = this.state.editorCardState;
    addInfoContacts(contacts).then(resp=>console.log(resp));
    addInfoCard(card).then(resp=>console.log(resp));
}

    render(){
        return(
            <form className="editing-form" onSubmit={(e)=>this.handleSubmit(e)}>
                <h3>Контактна інформація</h3>
                <div className="form-row field-phone-size">
                    <label htmlFor="phone1">Телефон гарячої лінії</label>
                    <input id="phone1" onChange={(e)=>this.handleContactInfo(e,'phone1')} type="text"  value={this.state.phones.phone1||''}/>
                </div>
                <div className="form-row field-phone-size">
                    <label htmlFor="phone2">Телефон адопції</label>
                    <input id="phone2" onChange={(e)=>this.handleContactInfo(e,'phone2')} type="text"  value={this.state.phones.phone2||''} />
                </div>
                <div className="form-row field-phone-size">
                    <label htmlFor="phone3">Телефон адопції</label>
                    <input id="phone3"
                        onChange={(e)=>this.handleContactInfo(e,'phone3')}
                        type="text"
                        value={this.state.phones.phone3||''} />
                </div>
                <div className="form-row field-phone-size">
                    <label htmlFor="phone4">Телефон адопції</label>
                    <input id="phone4" onChange={(e)=>this.handleContactInfo(e,'phone4')} type="text" value={this.state.phones.phone4||''}/>
                </div>
                <div className="form-row">
                    <label htmlFor="email-info">Електрона адреса</label>
                    <input id="email-info" onChange={(e)=>this.handleEmailInfo(e)} type="text" value={this.state.emails.animalRescue1||''}/>
                </div>
                <h4>Адреса</h4>
                <div className="form-row">
                    <label htmlFor="address-country">Країна</label>
                    <input id="address-country" onChange={(e)=>this.handleAddress(e,'country')} type="text" value={`${this.state.addresses.country}` ||''}/>
                </div>
                <div className="form-row">
                    <label htmlFor="address-city">Місто</label>
                    <input id="address-city" onChange={(e)=>this.handleAddress(e,'town')} type="text" value={this.state.addresses.town||''}/>
                </div>
                <div className="form-row">
                    <label htmlFor="address-street">Вулиця</label>
                    <input id="address-street" onChange={(e)=>this.handleAddress(e,'street')} type="text" value={this.state.addresses.street||''}/>
                </div>
                <h4>Банківські картки</h4>
                <HtmlEditor
                    editorState={this.state.editorCardState}
                    onChange={this.onEditorStateChange}
                  />
                <h4>Соц.мережі</h4>
                <div className="form-row">
                    <label htmlFor="social-facebook">Facebook</label>
                    <input id="social-facebook" onChange={(e)=>this.handleChangeSocialNetworks(e,'facebook')}  value={this.state.socialLinks.facebook||''}/>
                </div>
                <div className="form-row">
                    <label htmlFor="social-instagram">Instagram</label>
                    <input id="social-instagram" onChange={(e)=>this.handleChangeSocialNetworks(e,'instagram')}  value={this.state.socialLinks.instagram||''}/>
                </div>
                <div className="form-row">
                    <label htmlFor="social-youtube">Youtube</label>
                    <input id="social-youtube" onChange={(e)=>this.handleChangeSocialNetworks(e,'youtube')}  value={this.state.socialLinks.youtube||''}/>
                </div>
                <button type="submit" className="btn btn-blue" onSubmit={(e)=>this.handleSubmit(e)}>Зберегти зміни</button>
            </form>
        )
    }
}
